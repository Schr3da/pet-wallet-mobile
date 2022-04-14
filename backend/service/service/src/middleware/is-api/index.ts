import * as Koa from "koa";

export const isApiRequest = (ctx: Koa.Context) =>
  (ctx.url || "").indexOf("api/") !== -1;

export const isApiRequestMiddleware = () => {
  return async (ctx: Koa.Context, next: any) => {
    if (isApiRequest(ctx) === false) {
      return ctx.body = "not supported";
    }
    
    return next();
  };
};
