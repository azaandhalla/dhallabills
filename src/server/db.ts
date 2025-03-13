import { Account, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const db = {
  account: {
    create: async (data: Account) => {
      prisma.account.create({ data });
    },
  },
};
