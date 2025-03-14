import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@prisma/client";

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  balance: string;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  balance: "0.00",
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.balance = calculateBalance(action.payload);
    },
    // setBalance: (state, action: PayloadAction<string>) => {
    //   state.balance = action.payload;
    // },
    setFilteredTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.filteredTransactions = action.payload;
    },
  },
});

export const { setTransactions } = transactionSlice.actions;

const calculateBalance = (transactions: Transaction[]): string => {
  const balance = transactions.reduce((sum, item) => {
    if (item.type === "Sale") {
      return sum + item.amount;
    }
    return sum;
  }, 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);
};

export default transactionSlice.reducer;
