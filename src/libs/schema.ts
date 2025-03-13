import { z } from "zod";

export const newAccountSchema = z.object({
  name: z.string().min(2).max(50),
});

export const newTransactionSchema = z.object({
  accountId: z.string(),
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.date(),
  post: z.date(),
  type: z.string(),
});
