import { configureStore } from "@reduxjs/toolkit";

import transactions from "../features/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    transactions,
  },
});

export default store;
