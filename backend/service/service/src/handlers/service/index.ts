import * as Koa from "koa";
import { User } from '../../db/entity/user';
import { DBManager } from '../../db/db';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

const status = async (ctx: Koa.Context) => {
  ctx.body = {
    'status': {
      'statistics': {
        'numberOfUsers': await DBManager.userRepository?.numOfUsers(),
        'numOfNewsletterRegistrations': await DBManager.newsletterRegistrationRepository?.numOfRegistrations(),
      }
    }
  };
  ctx.status = StatusCodes.OK;
}

export {
  status
}
