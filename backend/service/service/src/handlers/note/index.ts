import * as Koa from "koa";
import * as _ from 'lodash';
import { User } from '../../db/entity/user';
import { Pet } from '../../db/entity/pet';
import { Note } from '../../db/entity/note';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { INote, ICreateWalletNotesRequest, IGetWalletNotesRequest, IGetWalletNotesResponse } from '../../api/note';
import { performValidation, htmlSanitize, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';

import { getUserToken, validateHeaderToken } from '../index'

const fs = require('fs');
const joi = require('joi');
const dbManager: DBManager = new DBManager();

const schemaNotesFind = joi.object().keys({
  petId: getJoiId()
});

const create = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  //if (!performValidation(ctx, schemaNotesCreate)) return;

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let request: ICreateWalletNotesRequest = ctx.request.body;

  await DBManager.noteRepository?.deleteNotesForPet(request.petId, userObj.id);

  if (request.notes != undefined) {
    request.notes.forEach((note) => {
      note.title = htmlSanitize(note.title);
      note.body = htmlSanitize(note.body);
    });

    for (let note of request.notes) {
      await DBManager.noteRepository?.createNote(request.petId, note.title, note.body);
    }
  }

  ctx.body = request;
}

const find = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaNotesFind)) return;

  let request: IGetWalletNotesRequest = ctx.request.body;

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let pet: Pet | undefined = await DBManager.petRepository?.findPetById(request.petId);
  if (pet == undefined || pet.userId != userObj.id) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: IGetWalletNotesResponse = {
    data: []
  };

  let notes: Note[] | undefined = await DBManager.noteRepository?.findNotesForPet(request.petId);
  if (notes != undefined) {
    for (let note of notes) {
      response.data.push(
        {
          'title': note.title,
          'body': note.body,
        }
      );
    }
  }

  ctx.body = response;
}

export {
  create,
  find,
}
