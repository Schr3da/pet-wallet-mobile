import Koa from "koa";
import Router from "koa-router";

import {User} from "petpass-endpoints";

import {UserHandler} from "../../../handlers"; 

const {Ids, Routes} = User;

export const userApiRoutes = (
  router: Router<Koa.Context, {}>
) => { 
  let config = Routes[Ids.create];
  router.post(config.url, (ctx: Koa.Context) => UserHandler.create(ctx));
  config = Routes[Ids.update];
  router.post(config.url, (ctx: Koa.Context) => UserHandler.update(ctx));
  config = Routes[Ids.find];
  router.post(config.url, (ctx: Koa.Context) => UserHandler.find(ctx));
  config = Routes[Ids.delete];
  router.post(config.url, (ctx: Koa.Context) => UserHandler.deleteOperation(ctx));
};
