import Cors from "@koa/cors";
import Koa from "koa";
import Logger from "koa-logger";

import * as DotEnv from "dotenv";
import * as process from "process";
import * as Security from "./security";
import * as os from "os";

import { createRouter } from "./routes";
import { DBManager } from "./db/db";
import { openStdin } from "process";

export const config = DotEnv.config();
export const jwtSeed = process.env.JWT_SEED || "jwt_secret_key";

export const dbManager: DBManager = new DBManager();

const koaBody = require('koa-body');

const init = async () => {

  console.log('start backend with env ' + JSON.stringify(process.env));

  await dbManager.initDbConnection();

  const app = new Koa();
  const router = createRouter();
  app.use(Security.defaultConfig());
  app.use(Security.xssFilter());
  app.use(Security.noCache());
  app.use(Security.noSniff());
  app.use(Security.frameGuard());
  app.use(Cors({ 
    origin: '*', 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }));

  app.use(Logger());

  app.use(koaBody({
    jsonLimit: "5mb",
    formidable: { uploadDir: process.env.UPLOAD_DIR || os.tmpdir() },    //This is where the files would come
    multipart: true,
    urlencoded: true,
    maxFieldsSize: 2 * 1024 * 1024
  }));

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(process.env.PORT || process.env.SERVICE_PORT || 9000);
};

init();
