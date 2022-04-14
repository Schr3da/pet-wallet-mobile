import Koa from "koa";
import Router from "koa-router";

import { Contact } from "petpass-endpoints";
import { ContactHandler } from "../../../handlers";
const { Ids, Routes } = Contact;

export const contactApiRoutes = (
  router: Router<Koa.Context, {}>
) => {
  let config = Routes[Ids.registerForNewsletter];
  router.post(config.url, (ctx: Koa.Context) => ContactHandler.registerNewsletter(ctx));
};
