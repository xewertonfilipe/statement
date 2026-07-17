import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import http from "../../http";
import type { DbTransaction, Transaction } from "../../interfaces";

export type TransactionsStatus = "idle" | "loading" | "succeeded" | "failed";

interface TransactionsState {
  transactions: DbTransaction[];
  status: TransactionsStatus;
  error: string | null;
}

interface TransactionsSliceState {
  transactions: TransactionsState;
}

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  error: null,
};

const mapDbTransactionToTransaction = (
  transaction: DbTransaction
): Transaction => {
  const rawDate = transaction.createdAt ?? transaction.date;

  return {
    ...transaction,
    date: new Date(rawDate),
  };
};

export const fetchTransactions = createAsyncThunk<
  DbTransaction[],
  void,
  { rejectValue: string }
>("transactions/fetchTransactions", (_, { rejectWithValue }) => {
  return http
    .get("/transactions?limit=3")
    .then((response) => {
      return response.data ?? [];
    })
    .catch(() => rejectWithValue("Nao foi possivel carregar o extrato."));
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Nao foi possivel carregar o extrato.";
      });
  },
});

export const selectTransactions = createSelector(
  (state: TransactionsSliceState) => state.transactions.transactions,
  (transactions): Transaction[] =>
    transactions.map(mapDbTransactionToTransaction)
);

export const selectTransactionsStatus = (state: TransactionsSliceState) =>
  state.transactions.status;
export const selectTransactionsError = (state: TransactionsSliceState) =>
  state.transactions.error;

export default transactionSlice.reducer;
