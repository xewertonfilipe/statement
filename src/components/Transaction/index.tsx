import type { Transaction as ITransaction } from "../../interfaces";
import {
  MonthLabel,
  TransactionAmount,
  TransactionDate,
  TransactionDivider,
  TransactionInfo,
  TransactionType,
  TransactionWrapper,
} from "./styles";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
};

const getMonthName = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  return date.toLocaleDateString("pt-BR", options);
};

interface TransactionProps {
  transaction: ITransaction;
}

export const Transaction = ({ transaction }: TransactionProps) => {
  const { value, type, date } = transaction;
  const month = getMonthName(date);
  const formattedDate = formatDate(date);
  const formattedValue = currencyFormatter.format(value);

  return (
    <TransactionWrapper>
      <MonthLabel>{month}</MonthLabel>
      <TransactionInfo>
        <TransactionType>{type}</TransactionType>
        <TransactionDate>{formattedDate}</TransactionDate>
      </TransactionInfo>
      <TransactionAmount>{formattedValue}</TransactionAmount>
      <TransactionDivider />
    </TransactionWrapper>
  );
};
