import Koa from "koa";
import Router from "koa-router";

import {Medicine} from "petpass-endpoints";
import {MedicineHandler} from "../../../handlers"; 
const {Ids, Routes} = Medicine;

export const medicineApiRoutes = (
  router: Router<Koa.Context, {}>
) => { 
  let config = Routes[Ids.findAll];
  router.post(config.url, (ctx: Koa.Context) => MedicineHandler.findAll(ctx));
  config = Routes[Ids.findById];
  router.post(config.url, (ctx: Koa.Context) => MedicineHandler.findById(ctx));
  config = Routes[Ids.findBySearchTerm];
  router.post(config.url, (ctx: Koa.Context) => MedicineHandler.findBySearchTerm(ctx));
};
