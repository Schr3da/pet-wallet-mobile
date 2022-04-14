import crypto from "crypto";
import Jwt from "jsonwebtoken";
import Koa from "koa";
import Helmet from "koa-helmet";

import {jwtSeed} from "..";

export const defaultConfig = () => Helmet();

export const xssFilter = () => Helmet.xssFilter();

export const noSniff = () => Helmet.noSniff();

export const noCache = () => Helmet.noCache();

export const frameGuard = () => Helmet.frameguard({ action: "sameorigin" });

export const contentSecurityPolicy = () =>
  Helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  });

export const createHash = (s: string | null) => {
  const hash = crypto.createHash("sha256");
  const random = Math.random().toString(36).substring(2, 15);

  return hash.update(s || "" + random, "utf8").digest("base64");
};

export const createShortLifetimeToken = (
  email: string,
  tempKey: string
): string => createToken(email, tempKey, 60 * 30);

export const createToken = (
  email: string,
  value: string,
  expiresIn: number = 24 * 60 * 60
): string => {
  const data: any = {
    email,
    expiresIn,
    value,
  };
  return Jwt.sign(data, jwtSeed);
};

export const tokenToObject = (
  token: string
): any | null => {
  try {
    return Jwt.verify(token, jwtSeed) as any;
  } catch (err) {
    return null;
  }
};

export const getTokenFromHeader = (req: Koa.Request): string => {
  if (req == null || req.headers == null || req.headers.authorization == null) {
    return "";
  }

  if (typeof req.header.authorization !== "string") {
    return "";
  }

  let token = req.headers.authorization.trim();
  token = token.replace(/ /g, "");
  token = token.replace("Bearer", "");
  return token;
};
