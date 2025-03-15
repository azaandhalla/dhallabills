import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@prisma/client";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  balance: string;
  error: string | null;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
}

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  balance: "0.00",
  error: null,
  sorting: [],
  columnFilters: [],
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
    setSorting: (state, action: PayloadAction<SortingState>) => {
      state.sorting = action.payload;
    },
    setColumnFilters: (state, action: PayloadAction<ColumnFiltersState>) => {
      state.columnFilters = action.payload;
    },
  },
});

export const {
  setTransactions,
  setFilteredTransactions,
  setSorting,
  setColumnFilters,
} = transactionSlice.actions;

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
