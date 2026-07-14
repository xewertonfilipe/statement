import { fetchTransactions } from "../features/transactions/transactionSlice";

const getFreshStore = async () => {
  jest.resetModules();
  const module = await import(".");
  return module.default;
};

describe("store", () => {
  it("starts with expected initial state", async () => {
    const store = await getFreshStore();
    const state = store.getState();

    expect(Object.keys(state)).toEqual(["transactions"]);
    expect(state.transactions.status).toBe("idle");
    expect(state.transactions.error).toBeNull();
    expect(state.transactions.transactions).toEqual([]);
  });

  it("updates transactions state for pending, fulfilled and rejected", async () => {
    const store = await getFreshStore();

    store.dispatch(fetchTransactions.pending("req-1", undefined));
    expect(store.getState().transactions.status).toBe("loading");
    expect(store.getState().transactions.error).toBeNull();

    store.dispatch(
      fetchTransactions.fulfilled(
        [
          {
            id: 1,
            value: 120,
            type: "deposito",
            createdAt: "2026-07-14T08:47:46.310Z",
          },
        ],
        "req-1",
        undefined
      )
    );
    expect(store.getState().transactions.status).toBe("succeeded");
    expect(store.getState().transactions.transactions).toHaveLength(1);

    store.dispatch(
      fetchTransactions.rejected(
        new Error("network"),
        "req-2",
        undefined,
        "Nao foi possivel carregar o extrato."
      )
    );
    expect(store.getState().transactions.status).toBe("failed");
    expect(store.getState().transactions.error).toBe(
      "Nao foi possivel carregar o extrato."
    );
  });
});
