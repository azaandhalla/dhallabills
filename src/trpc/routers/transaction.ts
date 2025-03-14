import { router } from "../trpc";

import publicProcedure from "../procedures/public";
import { newTransactionSchema } from "@/libs/schema";
import { prisma } from "@/server/db";
import { z } from "zod";

export const transactionRouter = router({
  transaction: {
    createMany: publicProcedure
      .input(newTransactionSchema.array())
      .mutation(async ({ input }) => {
        await prisma.transaction.createMany({ data: input });
      }),
    getAll: publicProcedure.input(z.string()).query(async ({ input }) => {
      const response = await prisma.transaction.findMany({
        where: { accountId: input },
      });
      return response;
    }),
  },
});
