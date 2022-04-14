import Koa from "koa";
import Router from "koa-router";

import { userApiRoutes } from "./user";
import { petApiRoutes } from "./pet";
import { noteApiRoutes } from "./note";
import { serviceApiRoutes } from "./service";
import { walletApiRoutes } from './wallet';
import { medicineApiRoutes } from './medicine';
import { shareApiRoutes } from './share';
import { contactApiRoutes } from './contact';

export const appendApiRoutes = (
  router: Router<Koa.Context, {}>
) => {
  serviceApiRoutes(router);
  userApiRoutes(router);
  petApiRoutes(router);
  noteApiRoutes(router);
  walletApiRoutes(router);
  medicineApiRoutes(router);
  shareApiRoutes(router);
  contactApiRoutes(router);
}

