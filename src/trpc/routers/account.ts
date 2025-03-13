import { router } from "../trpc";

import publicProcedure from "../procedures/public";
import { newAccountSchema } from "@/libs/schema";
import { prisma } from "@/server/db";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const accountRouter = router({
  account: {
    create: publicProcedure
      .input(newAccountSchema)
      .mutation(async ({ input }) => {
        console.log(input);
        return await prisma.account.create({
          data: { id: createId(), ...input },
        });
      }),
    get: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await prisma.account.findFirst({ where: { id: input } });
    }),
    getAll: publicProcedure.query(async () => {
      return await prisma.account.findMany();
    }),
  },
});
