import { middleware } from "../trpc";

export const withAuth = middleware(async ({ next }) => {
  //   if (!ctx.session) {
  // throw new TRPCError({ code: "UNAUTHORIZED" });
  //   }

  return next({
    ctx: {
      //   session: ctx.session,
    },
  });
});
