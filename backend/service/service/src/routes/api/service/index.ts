import Koa from "koa";
import Router from "koa-router";

import {Service} from "petpass-endpoints";

import {ServiceHandler} from "../../../handlers";

const {Routes, Ids} = Service;

export const serviceApiRoutes = (
  router: Router<Koa.Context, {}>
) => {
  let config = Routes[Ids.status];
  router.get(config.url, (ctx: Koa.Context) => ServiceHandler.status(ctx));
}
