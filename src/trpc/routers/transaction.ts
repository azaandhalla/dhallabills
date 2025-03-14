import { router } from "../trpc";

import publicProcedure from "../procedures/public";
import { Transaction } from "@prisma/client";
import { prisma } from "@/server/db";
import { z } from "zod";

export const transactionRouter = router({
  transaction: {
    createMany: publicProcedure
      .input(
        z.object({ transactions: z.custom<Omit<Transaction, "id">>().array() })
      )
      .mutation(async ({ input }) => {
        return await prisma.transaction.createManyAndReturn({
          data: input.transactions,
        });
      }),
    getAll: publicProcedure.input(z.string()).query(async ({ input }) => {
      const response = await prisma.transaction.findMany({
        where: { accountId: input },
      });
      return response;
    }),
  },
});
