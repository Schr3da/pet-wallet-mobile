import * as Koa from "koa";
import * as _ from 'lodash';
import { User } from '../../db/entity/user';
import { Pet } from '../../db/entity/pet';
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

const fs = require('fs');
const joi = require('joi');
const dbManager: DBManager = new DBManager();

const schemaPetCreate = joi.object().keys({
  name: getJoiString(3, 20),
  type: getJoiString(0, 20),
  dateOfBirth: getJoiDate(false, true),
  avatarImage: getJoiBase64(true, true)
});

const schemaPetUpdate = joi.object().keys({
  id: getJoiId(),
  name: getJoiString(3, 20),
  type: getJoiString(0, 20),
  dateOfBirth: getJoiDate(false, true),
  avatarImage: getJoiBase64(true, true)
});

const schemaPetFind = joi.object().keys({
});

const schemaPetDelete = joi.object().keys({
  id: getJoiId(),
})

const create = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetCreate)) return;

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let request: CreatePetRequest = ctx.request.body;
  request.name = htmlSanitize(request.name);
  request.type = htmlSanitize(request.type);

  let pet = new Pet();
  pet.name = request.name;
  pet.type = request.type;
  if (request.dateOfBirth != undefined) {
    pet.dateOfBirth = new Date(request.dateOfBirth);
  }
  if (request.avatarImage != undefined) {
    pet.avatarImage = request.avatarImage;
  }
  pet.userId = userObj.id;

  let responseRaw: Pet | undefined = undefined;

  let existingDuplicatedPets: Pet[] | undefined = [];//await DBManager.petRepository?.findPetByNameAndType(request.name, request.type, userObj.id);
  if (existingDuplicatedPets != undefined && existingDuplicatedPets.length >= 1) {
    // duplicate existing
    responseRaw = existingDuplicatedPets[0];

    // update relevant fields
    responseRaw.dateOfBirth = pet.dateOfBirth;
    responseRaw.avatarImage = pet.avatarImage;

    responseRaw = await DBManager.petRepository?.updatePet(responseRaw);
  } else {
    // no duplicate (with same name and type for user) existing yet, create it
    responseRaw = await DBManager.petRepository?.createPet(pet);
  }

  if (responseRaw == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: CreatePetResponse = {
    id: responseRaw.id,
    name: responseRaw.name,
    type: responseRaw.type,
    avatarImage: responseRaw.avatarImage,
    dateOfBirth: responseRaw.dateOfBirth != null ? responseRaw.dateOfBirth?.getTime() : null
  }

  ctx.body = response;
}

const update = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetUpdate)) return;

  let request: UpdatePetRequest = ctx.request.body;

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let pet: Pet | undefined = await DBManager.petRepository?.findPetById(request.id);
  if (pet == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  pet.name = htmlSanitize(request.name);
  pet.type = htmlSanitize(request.type);
  if (request.dateOfBirth != undefined) {
    pet.dateOfBirth = new Date(request.dateOfBirth);
  }
  if (request.avatarImage != undefined) {
    pet.avatarImage = request.avatarImage;
  }

  let responseRaw: Pet | undefined = await DBManager.petRepository?.updatePet(pet);
  if (responseRaw == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: UpdatePetResponse = {
    id: pet.id,
    name: pet.name,
    type: pet.type,
    avatarImage: pet.avatarImage,
    dateOfBirth: pet.dateOfBirth != null ? pet.dateOfBirth?.getTime() : null
  }

  ctx.body = response;
}

const find = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetFind)) return;

  let request: FindPetRequest = ctx.request.body;

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let pets: Pet[] | undefined = await DBManager.petRepository?.findPetsForUser(userObj.id);

  let response: FindPetResponseBase = new FindPetResponseBase();
  if (pets != undefined) {
    pets.forEach(pet => {
      let resultEntry: FindPetResponseEntry = {
        id: pet.id,
        name: pet.name,
        type: pet.type,
        avatarImage: pet.avatarImage,
        created: _.isNil(pet.created) ? 0 : pet.created.getTime(),
        dateOfBirth: _.isNil(pet.dateOfBirth) ? null : pet.dateOfBirth.getTime()
      }

      response.pets.push(resultEntry);
    });
  }

  ctx.body = response;
}

const deleteOperation = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaPetDelete)) return;

  let request: DeletePetRequest = ctx.request.body;
  let token = getUserToken(ctx);

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  await DBManager.shareRepository?.deleteSharesForUser(userObj.id);

  let response: DeletePetResponse | undefined = await DBManager.petRepository?.deletePet(request.id, userObj.id)
  ctx.body = response;
}




export {
  create,
  update,
  find,
  deleteOperation
}
