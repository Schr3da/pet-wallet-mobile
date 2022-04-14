import Koa from "koa";
import Router from "koa-router";

import {appendApiRoutes} from "./api";

import {
  errorApiMiddleware,
  xssApiMiddleware,
  isApiRequestMiddleware,
} from "../middleware";

export const createRouter = () => {
  const router = new Router<Koa.Context, {}>();

  router.use(xssApiMiddleware);
  router.use(errorApiMiddleware);
  router.use(isApiRequestMiddleware());

  appendApiRoutes(router);

  return router;
};
