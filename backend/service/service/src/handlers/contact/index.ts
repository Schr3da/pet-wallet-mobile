import * as Koa from "koa";
import * as _ from 'lodash';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

import { NewsletterRegistrationRequest, NewsletterRegistrationResponse } from '../../api/contact';
const fs = require('fs');

const joi = require('joi');
import { performValidation, htmlSanitize, getJoiId, getJoiString, getJoiBase64, getJoiDate } from '../baseHandler';
import { DBManager } from "../../db/db";

const schemaRegisterForNewsletter = joi.object().keys({
  email: getJoiString(5, 200),
  text: getJoiString(0, 1000)
});

const registerNewsletter = async (ctx: Koa.Context) => {
  if (!performValidation(ctx, schemaRegisterForNewsletter)) return;

  let request: NewsletterRegistrationRequest = ctx.request.body;
  request.email = htmlSanitize(request.email);
  request.text = htmlSanitize(request.text);

  let response: NewsletterRegistrationResponse | undefined = await DBManager.newsletterRegistrationRepository?.register(request.email, request.text);
  ctx.body = response;
}

export {
  registerNewsletter
}
