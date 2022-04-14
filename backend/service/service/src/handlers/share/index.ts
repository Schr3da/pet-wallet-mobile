import * as Koa from "koa";
import * as _ from 'lodash';
import { User } from '../../db/entity/user';
import { Pet } from '../../db/entity/pet';
import { Share } from '../../db/entity/share';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { CreatePetRequest, CreatePetResponse, UpdatePetRequest, UpdatePetResponse, FindPetRequest, FindPetResponseBase, FindPetResponseEntry, DeletePetRequest, DeletePetResponse } from '../../api/pet';
import { performValidation, htmlSanitize, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';

import { getUserToken, validateHeaderToken } from '../index'
import { CreateShareRequest, CreateShareResponse, DeleteShareRequest, DeleteShareResponse, GetSharedDataRequest, GetSharedDataResponse } from "../../api/share";
import { FindWalletEntriesResponseEntry } from '../../api/wallet';
import { PetWalletEntry } from "../../db/entity/wallet";
import { entries } from "lodash";

const fs = require('fs');
const joi = require('joi');
const dbManager: DBManager = new DBManager();

const schemaPetShareCreate = joi.object().keys({
  petId: getJoiId
});

const schemaPetShareDelete = joi.object().keys({
  shareTokenId: getJoiId
});

const schemaPetShareFind = joi.object().keys({
  shareTokenId: getJoiId
});

const create = async (ctx: Koa.Context) => {

  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetShareCreate)) return;

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let request: CreateShareRequest = ctx.request.body;

  let petObj = await DBManager.petRepository?.findPetById(request.petId);
  if (petObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  if (userObj.id != petObj.userId) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let responseRaw: Share | undefined = await DBManager.shareRepository?.createShare(userObj.id, request.petId);

  if (responseRaw == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: CreateShareResponse = {
    shareTokenId: responseRaw.id
  };


  console.log('cerate share response ' + JSON.stringify(response));

  ctx.body = response;
}

const find = async (ctx: Koa.Context) => {
  if (!performValidation(ctx, schemaPetShareFind)) return;

  let request: GetSharedDataRequest = ctx.request.body;

  let share: Share | undefined = await DBManager.shareRepository?.findById(request.shareTokenId);
  if (share == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let pet: Pet | undefined = await DBManager.petRepository?.findPetById(share.petId);
  if (pet == undefined) {
    ctx.status = StatusCodes.NOT_FOUND;
    return;
  }

  let entriesForSharedPet: PetWalletEntry[] | undefined = await DBManager.petWalletRepository?.findWalletEntriesForPet(share.petId);
  let walletEntriesResponse: FindWalletEntriesResponseEntry[] = [];
  if (entriesForSharedPet != undefined) {
    entriesForSharedPet.forEach(walletEntry => {
      walletEntriesResponse.push(
        {
          id: walletEntry.id,
          medicineId: walletEntry.medicineId,
          title: walletEntry.title,
          description: walletEntry.description,
          date: walletEntry.date.getTime()
        }
      );
    });
  }

  let response: GetSharedDataResponse = {
    pet: {
      id: pet.id,
      name: pet.name,
      type: pet.type,
      avatarImage: pet.avatarImage,
      created: pet.created.getTime(),
      dateOfBirth: pet.dateOfBirth != null ? pet.dateOfBirth.getTime() : null
    },
    entries: walletEntriesResponse
  }

  ctx.body = response;
}

const deleteOperation = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetShareDelete)) return;

  let request: DeleteShareRequest = ctx.request.body;
  let token = getUserToken(ctx);

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: DeleteShareResponse | undefined = await DBManager.shareRepository?.deleteShare(request.shareTokenId, userObj.id);
  ctx.body = response;
}

export {
  create,
  find,
  deleteOperation
}
