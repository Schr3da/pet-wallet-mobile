import Koa from "koa";
import Router from "koa-router";

import { Share } from "petpass-endpoints";
import { ShareHandler } from "../../../handlers";
const { Ids, Routes } = Share;

export const shareApiRoutes = (
  router: Router<Koa.Context, {}>
) => {
  let config = Routes[Ids.create];
  router.post(config.url, (ctx: Koa.Context) => ShareHandler.create(ctx));
  config = Routes[Ids.delete];
  router.post(config.url, (ctx: Koa.Context) => ShareHandler.deleteOperation(ctx));
  config = Routes[Ids.find];
  router.post(config.url, (ctx: Koa.Context) => ShareHandler.find(ctx));
};
