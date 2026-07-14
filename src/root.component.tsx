import { useEffect } from "react";
import { Provider } from "react-redux";

import { Statement } from "./components/Statement";
import {
  fetchTransactions,
  selectTransactions,
  selectTransactionsError,
  selectTransactionsStatus,
} from "./features/transactions/transactionSlice";
import store from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const TRANSACTION_CREATED_EVENT = "bank:transaction:created";

function StatementApp() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const status = useAppSelector(selectTransactionsStatus);
  const error = useAppSelector(selectTransactionsError);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    const handleTransactionCreated = () => {
      dispatch(fetchTransactions());
    };

    document.addEventListener(
      TRANSACTION_CREATED_EVENT,
      handleTransactionCreated
    );

    return () => {
      document.removeEventListener(
        TRANSACTION_CREATED_EVENT,
        handleTransactionCreated
      );
    };
  }, [dispatch]);

  return (
    <Statement transactions={transactions} status={status} error={error} />
  );
}

export default function Root() {
  return (
    <>
      <Provider store={store}>
        <StatementApp />
      </Provider>
    </>
  );
}
