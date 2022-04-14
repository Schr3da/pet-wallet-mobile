const xssPattern = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/;
const regex = new RegExp(xssPattern);
const xssPotential = <T extends {}>(data: T) =>
  Object.keys(data || {}).some((k: string) => {
    const value = (data as any)[k];
    return regex.test(value);
  });

export const xssApiMiddleware = (ctx: any, next: () => Promise<void>) => {
  const body = ctx.request.body;
  if (xssPotential(body)) {
    ctx.body = "Not allowed";
    return;
  }
  return next();
};
