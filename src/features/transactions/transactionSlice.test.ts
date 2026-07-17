import http from "../../http";
import reducer, {
  fetchTransactions,
  selectTransactions,
  selectTransactionsError,
  selectTransactionsStatus,
} from "./transactionSlice";

jest.mock("../../http", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("fetchTransactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns fulfilled with API payload", async () => {
    const mockedHttp = http as unknown as { get: jest.Mock };
    const payload = [
      {
        id: 1,
        value: 120,
        type: "deposito",
        createdAt: "2026-07-14T08:47:46.310Z",
      },
    ];

    mockedHttp.get.mockResolvedValue({ data: payload });

    const action = await fetchTransactions()(jest.fn(), jest.fn(), undefined);

    expect(mockedHttp.get).toHaveBeenCalledWith("/transactions?limit=3");
    expect(action.type).toBe("transactions/fetchTransactions/fulfilled");
    expect(action.payload).toEqual(payload);
  });

  it("returns rejected action with a friendly message on API failure", async () => {
    const mockedHttp = http as unknown as { get: jest.Mock };

    mockedHttp.get.mockRejectedValue(new Error("timeout"));

    const action = await fetchTransactions()(jest.fn(), jest.fn(), undefined);

    expect(action.type).toBe("transactions/fetchTransactions/rejected");
    expect(action.payload).toBe("Nao foi possivel carregar o extrato.");
  });
});

describe("transactions reducer", () => {
  it("updates loading, success and failed states", () => {
    const pendingState = reducer(
      undefined,
      fetchTransactions.pending("req-1", undefined)
    );

    expect(pendingState.status).toBe("loading");
    expect(pendingState.error).toBeNull();

    const fulfilledState = reducer(
      pendingState,
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

    expect(fulfilledState.status).toBe("succeeded");
    expect(fulfilledState.transactions).toHaveLength(1);

    const rejectedState = reducer(
      fulfilledState,
      fetchTransactions.rejected(
        new Error("network"),
        "req-2",
        undefined,
        "Nao foi possivel carregar o extrato."
      )
    );

    expect(rejectedState.status).toBe("failed");
    expect(rejectedState.error).toBe("Nao foi possivel carregar o extrato.");
  });
});

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

  it("falls back to date when createdAt is missing", () => {
    const fallbackDate = "2026-07-14T10:00:00.000Z";
    const state = {
      transactions: {
        transactions: [
          {
            id: 2,
            value: 50,
            type: "saque",
            createdAt: undefined,
            date: fallbackDate,
          },
        ],
        status: "succeeded" as const,
        error: null,
      },
    };

    const [transaction] = selectTransactions(state as never);

    expect(transaction.date).toBeInstanceOf(Date);
    expect(transaction.date.toISOString()).toBe(fallbackDate);
  });

  it("reads status and error selectors", () => {
    const state = {
      transactions: {
        transactions: [],
        status: "failed" as const,
        error: "Nao foi possivel carregar o extrato.",
      },
    };

    expect(selectTransactionsStatus(state)).toBe("failed");
    expect(selectTransactionsError(state)).toBe(
      "Nao foi possivel carregar o extrato."
    );
  });
});
