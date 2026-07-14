import type { Transaction as ITransaction } from "../../interfaces";
import { Transaction } from "../Transaction";
import { Container, Heading, TransactionsList } from "./styles";

interface TransactionsProps {
  transactions: ITransaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const Statement = ({ transactions, status, error }: TransactionsProps) => {
  return (
    <Container>
      <Heading>Extrato</Heading>
      {status === "loading" ? <p>Carregando extrato...</p> : null}
      {status === "failed" && error ? <p>{error}</p> : null}
      <TransactionsList>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </TransactionsList>
    </Container>
  );
};
