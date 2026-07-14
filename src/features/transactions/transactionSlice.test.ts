import { selectTransactions } from "./transactionSlice";

describe("selectTransactions", () => {
  it("maps createdAt from the API response into a valid Date", () => {
    const createdAt = "2026-07-14T08:47:46.310Z";
    const state = {
      transactions: {
        transactions: [
          {
            id: 1,
            value: 120,
            type: "deposito",
            createdAt,
          },
        ],
        status: "succeeded" as const,
        error: null,
      },
    };

    const [transaction] = selectTransactions(state);

    expect(transaction.date).toBeInstanceOf(Date);
    expect(transaction.date.toISOString()).toBe(createdAt);
  });
});
