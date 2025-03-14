import { router } from "../trpc";

import publicProcedure from "../procedures/public";
import { prisma } from "@/server/db";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { Account } from "@prisma/client";

export const accountRouter = router({
  account: {
    create: publicProcedure
      .input(z.object({ account: z.custom<Omit<Account, "id">>() }))
      .mutation(async ({ input }) => {
        return await prisma.account.create({
          data: { id: createId(), ...input.account },
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
