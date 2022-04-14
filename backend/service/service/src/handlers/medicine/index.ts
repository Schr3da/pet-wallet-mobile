import * as Koa from "koa";
import * as _ from 'lodash';
import { Medicine } from '../../db/entity/medicine';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

import { validateHeaderToken } from '../index'
const fs = require('fs');

const joi = require('joi');
import { performValidation, htmlSanitize, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';
const dbManager: DBManager = new DBManager();

const schemaMedicineFindAll = joi.object().keys({
});

const schemaMedicineFindById = joi.object().keys({
  medicineId: getJoiId()
});

const schemaMedicineFindBySearchTerm = joi.object().keys({
  medicineId: getJoiString(3, 20)
});

const findAll = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaMedicineFindAll)) return;

  ctx.body = await DBManager.medicineRepository?.findMedicines();
}

const findById = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaMedicineFindById)) return;

  ctx.body = await DBManager.medicineRepository?.findMedicineById(ctx.request.body.id);
}

const findBySearchTerm = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaMedicineFindBySearchTerm)) return;

  ctx.body = await DBManager.medicineRepository?.findMedicineBySearchTerm(ctx.request.body.searchTerm);
}

export {
  findAll,
  findById,
  findBySearchTerm
}
