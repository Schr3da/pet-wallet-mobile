import Koa from "koa";
import Router from "koa-router";

import { Note } from "petpass-endpoints";
import { NoteHandler } from "../../../handlers";
const { Ids, Routes } = Note;

export const noteApiRoutes = (
  router: Router<Koa.Context, {}>
) => {
  let config = Routes[Ids.create];
  router.post(config.url, (ctx: Koa.Context) => NoteHandler.create(ctx));
  config = Routes[Ids.find];
  router.post(config.url, (ctx: Koa.Context) => NoteHandler.find(ctx));
};
