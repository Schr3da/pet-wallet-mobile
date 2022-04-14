import * as Koa from "koa";
import koaBody from 'koa-body';
import { User } from '../../db/entity/user';
import { Pet } from '../../db/entity/pet';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { CreateUserRequest, CreateUserResponse, UpdateUserRequest, UpdateUserResponse, FindUserRequest, FindUserResponse, DeleteUserRequest, DeleteUserResponse } from '../../api/user';
import { performValidation, htmlSanitize, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';
import { getUserToken, validateHeaderToken } from '../index'

const joi = require('joi');
const dbManager: DBManager = new DBManager();

const schemaUserCreate = joi.object().keys({
  nickname: getJoiString(3, 20)
});

const schemaUserUpdate = joi.object().keys({
  nickname: getJoiString(3, 20)
});

const schemaTokenFind = joi.object().keys({
});

const schemaTokenDelete = joi.object().keys({
});

const create = async (ctx: Koa.Context) => {

  if (!performValidation(ctx, schemaUserCreate)) return;

  let request: CreateUserRequest = ctx.request.body;
  request.nickname = htmlSanitize(request.nickname);

  let response: CreateUserResponse | undefined = await DBManager.userRepository?.createUser(request.nickname);
  ctx.body = response;
}

const update = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaUserUpdate)) return;

  let request: UpdateUserRequest = ctx.request.body;
  request.nickname = htmlSanitize(request.nickname);

  let updatedUser: User = ctx.request.body;
  updatedUser.token = getUserToken(ctx);

  await DBManager.userRepository?.updateUser(ctx.request.body);
  let response: UpdateUserResponse = {
    nickname: request.nickname
  }

  ctx.body = response;
}

const find = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaTokenFind)) return;

  let responseRaw: User | undefined = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (responseRaw == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return
  }

  let response: FindUserResponse = {
    token: responseRaw.token,
    nickname: responseRaw.nickname,
    created: responseRaw.created.getTime()
  };
  ctx.body = response;
}

const deleteOperation = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaTokenDelete)) return;

  let userObj: User | undefined = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return
  }
  
  const userId: string = userObj.id;

  let pets: Pet[] | undefined = await DBManager.petRepository?.findPetsForUser(userId);
  if (pets != undefined && userObj != undefined) {
    pets.forEach((pet: Pet) => {
      if (pet != undefined) {
        DBManager.petWalletScanRepository?.deleteWalletScansForPet(pet.id);
        DBManager.petWalletRepository?.deleteWalletEntryForPet(pet.id);
        DBManager.petRepository?.deletePet(pet.id, userId);
      }
    });
  }

  await DBManager.shareRepository?.deleteSharesForUser(userId);
  await DBManager.userRepository?.delete(userId);
  ctx.body = {};
}

export {
  create,
  update,
  find,
  deleteOperation
}
