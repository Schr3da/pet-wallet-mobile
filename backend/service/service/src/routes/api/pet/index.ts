import Koa from "koa";
import Router from "koa-router";

import {Pet} from "petpass-endpoints";
import {PetHandler} from "../../../handlers"; 
const {Ids, Routes} = Pet;

export const petApiRoutes = (
  router: Router<Koa.Context, {}>
) => { 
  let config = Routes[Ids.create];
  router.post(config.url, (ctx: Koa.Context) => PetHandler.create(ctx));
  config = Routes[Ids.update];
  router.post(config.url, (ctx: Koa.Context) => PetHandler.update(ctx));
  config = Routes[Ids.find];
  router.post(config.url, (ctx: Koa.Context) => PetHandler.find(ctx));
  config = Routes[Ids.delete];
  router.post(config.url, (ctx: Koa.Context) => PetHandler.deleteOperation(ctx));
};
