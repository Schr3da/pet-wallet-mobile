import * as Koa from "koa";

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

import * as ServiceHandler from "./service";
import * as PetHandler from "./pet";
import * as UserHandler from "./user";
import * as WalletHandler from './wallet'
import * as MedicineHandler from './medicine'
import * as ShareHandler from './share';
import * as ContactHandler from './contact';
import * as NoteHandler from './note';

export const getUserToken = (ctx: Koa.Context) => {
  return ctx.request.headers['token'];
}

export const validateHeaderToken = (ctx: Koa.Context) => {
  let userToken = getUserToken(ctx);
  console.log('validate user ' + userToken);
  if (userToken == undefined || userToken == null) {
    ctx.throw(StatusCodes.UNAUTHORIZED, 'unsupported content-type');
  }
}

export {
  ServiceHandler,
  PetHandler,
  UserHandler,
  WalletHandler,
  MedicineHandler,
  ShareHandler,
  ContactHandler,
  NoteHandler
}