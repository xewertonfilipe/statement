import { configureStore } from "@reduxjs/toolkit";

import transactions from "../features/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    transactions,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
