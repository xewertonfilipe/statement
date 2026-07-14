import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { Statement } from "./components/Statement";
import {
  fetchTransactions,
  selectTransactions,
  selectTransactionsError,
  selectTransactionsStatus,
} from "./features/transactions/transactionSlice";
import store from "./store";

function StatementApp() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => selectTransactions(state));
  const status = useSelector((state) => selectTransactionsStatus(state));
  const error = useSelector((state) => selectTransactionsError(state));

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return <Statement transactions={transactions} status={status} error={error} />;
}

export default function Root(props) {
  return (
    <>
      <Provider store={store}>
        <StatementApp />
      </Provider>
    </>
  );
}
