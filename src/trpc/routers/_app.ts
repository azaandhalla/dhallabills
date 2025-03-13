import { createCallerFactory, mergeRouters } from "../trpc";

import { createContext } from "../context";
import { accountRouter } from "./account";
import { transactionRouter } from "./transaction";

export const appRouter = mergeRouters(accountRouter, transactionRouter);

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
