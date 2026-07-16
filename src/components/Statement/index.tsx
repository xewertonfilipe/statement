import type { Transaction as ITransaction } from "../../interfaces";
import { Transaction } from "../Transaction";
import { LoadingStatement } from "./LoadingStatement";
import { Container, Heading, TransactionsList } from "./styles";

interface TransactionsProps {
  transactions: ITransaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const Statement = ({
  transactions,
  status,
  error,
}: TransactionsProps) => {
  const hasTransactions = transactions.length > 0;
  const shouldShowEmptyState =
    !hasTransactions && status !== "loading" && status !== "failed";

  return (
    <Container>
      <Heading>Extrato</Heading>
      {status === "loading" ? <LoadingStatement /> : null}
      {status === "failed" && error ? <p>{error}</p> : null}
      {shouldShowEmptyState ? <p>Voce ainda nao possui transacoes.</p> : null}
      {hasTransactions ? (
        <TransactionsList>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </TransactionsList>
      ) : null}
    </Container>
  );
};
