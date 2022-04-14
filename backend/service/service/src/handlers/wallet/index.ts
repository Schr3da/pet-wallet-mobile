import * as Koa from "koa";
import { User } from '../../db/entity/user';
import { Pet } from '../../db/entity/pet';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletEntryRequest, CreateWalletEntryResponse, DeleteWalletEntryRequest, DeleteWalletEntryResponse, DeleteWalletScanRequest, DeleteWalletScanResponse, FindWalletEntriesRequest, FindWalletEntriesResponse, FindWalletEntriesResponseEntry, UpdateWalletEntryRequest, UpdateWalletEntryResponse } from '../../api/wallet';
import { PetWalletEntry, PetWalletScan } from '../../db/entity/wallet';
import { CreateWalletScanRequest, CreateWalletScanResponse, PetWalletScanResponseResultSuggestion, PetWalletScanMedicineInfo } from '../../api/wallet';
import { htmlSanitize, performValidation, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { LevenshteinOptions, get as levenshteinGet } from 'fast-levenshtein';
const superagent = require('superagent');
import * as _ from 'lodash';

const joi = require('joi');
const dbManager: DBManager = new DBManager();

import { getUserToken, validateHeaderToken } from '../index'
import { Medicine } from "../../db/entity/medicine";

import * as nodeprocess from "process";

const ocr_space_url = nodeprocess.env.OCR_SPACE_URL || 'https://api.ocr.space/parse/image';
const ocr_space_key = nodeprocess.env.OCR_SPACE_APIKEY || '988c1c0c0a88957';
const medicine_compare_max_levenshtein_dist = nodeprocess.env.MEDICINE_MAX_LEVENSHTEIN_DIST || 3;

const schemaWalletEntryCreate = joi.object().keys({
  petId: getJoiId(),
  medicineId: getJoiString(3, 40, true, true),
  title: getJoiString(0, 100),
  description: getJoiString(0, 2048, false, true),
  date: getJoiDate(false, true)
});

const schemaWalletEntryUpdate = joi.object().keys({
  id: getJoiId(),
  petId: getJoiId(),
  medicineId: getJoiString(3, 40, true, true),
  title: getJoiString(0, 100),
  description: getJoiString(0, 2048, false, true),
  date: getJoiDate(false, true),
});

const schemaWalletEntryFind = joi.object().keys({
  petId: getJoiId()
});

const schemaWalletEntryProcess = joi.object().keys({
  petId: getJoiId(),
  scan: getJoiBase64(false, true),
});

const schemaWalletEntryDelete = joi.object().keys({
  id: getJoiId()
});

const schemaWalletEntryProcessedDelete = joi.object().keys({
  id: getJoiId()
});

const create = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryCreate)) return;

  let request: CreateWalletEntryRequest = ctx.request.body;
  request.title = htmlSanitize(request.title);
  request.description = htmlSanitize(request.description);

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let petObj = await DBManager.petRepository?.findPetById(request.petId);
  if (petObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  if (userObj.id != petObj.userId) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let entry: PetWalletEntry = new PetWalletEntry();
  entry.id = uuidv4();
  entry.petId = petObj.id;
  if (request.medicineId != undefined) {
    entry.medicineId = request.medicineId;
  }
  entry.title = request.title;
  entry.description = request.description;
  entry.date = new Date(request.date);

  let responseRaw: PetWalletEntry | undefined = await DBManager.petWalletRepository?.createWalletEntry(entry);
  if (responseRaw == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: CreateWalletEntryResponse = {
    id: responseRaw.id,
    petId: responseRaw.petId,
    medicineId: responseRaw.medicineId,
    title: responseRaw.title,
    description: responseRaw.description,
    date: _.isNil(responseRaw.date) ? 0 : responseRaw.date.getTime()
  };
  ctx.body = response;
}

const update = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryUpdate)) return;

  let request: UpdateWalletEntryRequest = ctx.request.body;
  request.title = htmlSanitize(request.title);
  request.description = htmlSanitize(request.description);

  let token = getUserToken(ctx);
  let userObj = await DBManager.userRepository?.findUserByToken(token);
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let petObj = await DBManager.petRepository?.findPetById(request.petId);
  if (petObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  if (userObj.id != petObj.userId) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let updatedWallEntry: PetWalletEntry = new PetWalletEntry();
  updatedWallEntry.id = request.id;
  updatedWallEntry.petId = request.petId;
  if (request.medicineId != undefined) {
    updatedWallEntry.medicineId = request.medicineId;
  }
  updatedWallEntry.title = request.title;
  updatedWallEntry.description = request.description;
  updatedWallEntry.date = new Date(request.date);

  await DBManager.petWalletRepository?.updateWalletEntry(updatedWallEntry);

  let response: UpdateWalletEntryResponse = {
    petId: request.petId,
    medicineId: request.medicineId != undefined ? request.medicineId : null,
    title: request.title,
    description: request.description,
    date: request.date
  };
  ctx.body = response;
}

const find = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryFind)) return;

  let request: FindWalletEntriesRequest = ctx.request.body;

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let entries: PetWalletEntry[] | undefined = await DBManager.petWalletRepository?.findWalletEntriesForPet(request.petId);
  let response: FindWalletEntriesResponse = {
    entries: []
  };
  if (entries != undefined) {
    entries.forEach(entry => {
      let resultEntry: FindWalletEntriesResponseEntry = {
        id: entry.id,
        medicineId: entry.medicineId,
        title: entry.title,
        description: entry.description,
        date: entry.date.getTime()
      };
      response.entries.push(resultEntry);
    });
  }

  ctx.body = response;
}

const deleteOperation = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryDelete)) return;

  let request: DeleteWalletEntryRequest = ctx.request.body;
  let token = getUserToken(ctx);

  let userObj = await DBManager.userRepository?.findUserByToken(getUserToken(ctx));
  if (userObj == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let entryToDelete: PetWalletEntry | undefined = await DBManager.petWalletRepository?.findById(request.id);
  if (entryToDelete == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let assignedPet: Pet | undefined = await DBManager.petRepository?.findById(entryToDelete?.petId);
  if (assignedPet == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  if (assignedPet.userId != userObj.id) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: DeleteWalletEntryResponse | undefined = await DBManager.petWalletRepository?.deleteWalletEntry(request.id, assignedPet.id)
  ctx.body = response;
}

const process = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryProcess)) return;

  console.log('-----------------------');

  let request: CreateWalletScanRequest = ctx.request.body;

  // ocr call
  let ocrResult = await superagent.post(ocr_space_url)
    .field('apikey', ocr_space_key)
    .field('filetype', 'jpg')
    .field('detectOrientation', 'true')
    .field('isCreateSearchablePdf', 'false')
    .field('OCREngine', '2')
    .field('base64Image', request.scan);

  console.log(new Date() + ' ocr result' + JSON.stringify(ocrResult.text));

  let ocrResultDocument = JSON.parse(ocrResult.text);

  let parsedText: string = _.get(ocrResultDocument, 'ParsedResults[0].ParsedText', '');
  let parsedTextRotation: number = _.get(ocrResultDocument, 'ParsedResults[0].TextOrientation', 0);

  console.log(new Date() + ' ocr text' + parsedText);

  // medical query lookup
  let scan: PetWalletScan = new PetWalletScan();
  scan.id = uuidv4();
  scan.petId = request.petId;
  scan.ocrTokensRaw = [];
  scan.ocrTokensRaw = parsedText.split(/[,.\\n \\\n]/);
  scan.ocrTokensRaw.filter((item, index) => scan.ocrTokensRaw.indexOf(item) == index);
  scan.ocrImageRotation = parsedTextRotation;
  scan.created = new Date();
  scan.image = request.scan;

  let result: CreateWalletScanResponse = {
    id: '',
    ocrTokenRaw: scan.ocrTokensRaw,
    suggestions: []
  };

  let knownMedicines: Medicine[] | undefined = await DBManager.medicineRepository?.findMedicines();
  if (knownMedicines != undefined) {
    // process result for certain ocr token
    for (let j = 0; j < scan.ocrTokensRaw.length; j++) {
      // don't process single characters or other trash tokens
      if (scan.ocrTokensRaw[j].length <= 5) continue;

      // check against every known medicine
      for (let i = 0; i < knownMedicines.length; i++) {
        let medicine: Medicine = knownMedicines[i];
        let levenshteinDistance = levenshteinGet(scan.ocrTokensRaw[j], medicine.searchTerm);
        if (levenshteinDistance < medicine_compare_max_levenshtein_dist) {

          // create a suggestion based on this medicine
          let suggestion: PetWalletScanResponseResultSuggestion = {
            searchTerm: medicine.searchTerm,
            knownToken: scan.ocrTokensRaw[j],
            medicineId: medicine.id,
            medicineInfos: []
          };
          result.suggestions.push(suggestion);

          // add medicine infos
          if (medicine.infos != undefined) {
            for (let j = 0; j < medicine.infos?.length; j++) {
              let info: PetWalletScanMedicineInfo = {
                shortInfo: medicine.infos[j].shortDescription,
                longInfo: medicine.infos[j].longDescription,
                language: medicine.infos[j].language,
                url: medicine.infos[j].url
              };

              // HACK limit length (due persisting as wallet entry)
              if(info.longInfo != undefined && info.longInfo != null && info.longInfo.length > 2048) {
                info.longInfo = info.longInfo.substring(0, 2048);
              }

              suggestion.medicineInfos.push(info);
            }
          }

          // ++++++ HACK for DEV +++++++++
          if (suggestion.medicineInfos != undefined && suggestion.medicineInfos.length == 1 && suggestion.medicineInfos[0].language == 'de') {
            suggestion.medicineInfos.push(Object.assign({}, suggestion.medicineInfos[0]));
            suggestion.medicineInfos[1].language = 'en';
          }
        }
      }
    }

    scan.processed = new Date();

    let scanResult: PetWalletScan | undefined = await DBManager.petWalletScanRepository?.createWalletScan(scan);
    if (scanResult != undefined) {
      result.id = scanResult?.id;
    }

    ctx.body = result;
  }
  console.log('-----------------------');

}

const deleteProcessed = async (ctx: Koa.Context) => {
  validateHeaderToken(ctx);
  if (!performValidation(ctx, schemaWalletEntryProcessedDelete)) return;

  let request: DeleteWalletScanRequest = ctx.request.body;
  let token = getUserToken(ctx);

  let entryToDelete: PetWalletScan | undefined = await DBManager.petWalletScanRepository?.findById(request.id);
  if (entryToDelete == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let assignedPet: Pet | undefined = await DBManager.petRepository?.findById(entryToDelete?.petId);
  if (assignedPet == undefined) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  if (assignedPet?.userId != token) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  let response: DeleteWalletScanResponse | undefined = await DBManager.petWalletScanRepository?.deleteWalletScan(request.id, entryToDelete.petId)
  ctx.body = response;
}

export {
  create,
  update,
  find,
  deleteOperation,
  process,
  deleteProcessed
}