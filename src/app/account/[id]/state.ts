// store.ts
import { trpc } from "@/libs/trpc";
import { Transaction } from "@prisma/client";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
// import thunk from "redux-thunk";

// Define the shape of the slice's state
interface TransactionState {
  transactions: Transaction[];
  filter: {
    start?: Date;
    end?: Date;
  };
  balance: number;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch transactions from an API
export const fetchTransactions = createAsyncThunk<
  Transaction[],
  { accountId?: string }
>("transactions/fetchTransactions", async ({ accountId }) => {
  let transaction: Transaction[] = [];

  if (accountId) {
    const response = trpc.transaction.getAll.useQuery(accountId);

    if (!response.error) {
      throw new Error("Failed to fetch transactions");
    }

    if (response.data) {
      transaction = response.data;
    }
  }

  return transaction;
});

// Initial state
const initialState: TransactionState = {
  transactions: [],
  filter: {},
  balance: 0,
  loading: false,
  error: null,
};

// Create the slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ start: Date; end: Date }>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        // Recalculate balance
        state.balance = action.payload.reduce(
          (sum, txn) =>
            txn.type === "credit" ? sum + txn.amount : sum - txn.amount,
          0
        );
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

// Export actions and store
export const { setFilter } = transactionSlice.actions;

export const store = configureStore({
  reducer: {
    transactions: transactionSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
