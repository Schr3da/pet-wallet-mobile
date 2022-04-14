export const errorApiMiddleware = async (
  ctx: any,
  next: () => Promise<void>
) => {
  return next().catch((err) => {
    if (err == null) {
      throw err;
    } else if (err.status === 401) {
      ctx.body = "Unauthorized";
    } else if (err.status === 404) {
      ctx.body = "Not found";
    } else {
      throw err;
    }
  });
};
