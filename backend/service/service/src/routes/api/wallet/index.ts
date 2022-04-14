import Koa from "koa";
import Router from "koa-router";

import {Wallet} from "petpass-endpoints";
import {WalletHandler} from "../../../handlers"; 
const {Ids, Routes} = Wallet;

export const walletApiRoutes = (
  router: Router<Koa.Context, {}>
) => { 
  let config = Routes[Ids.create];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.create(ctx));
  config = Routes[Ids.update];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.update(ctx));
  config = Routes[Ids.find];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.find(ctx));
  config = Routes[Ids.delete];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.deleteOperation(ctx));
  config = Routes[Ids.process];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.process(ctx));
  config = Routes[Ids.deleteProcessed];
  router.post(config.url, (ctx: Koa.Context) => WalletHandler.deleteProcessed(ctx));
};
