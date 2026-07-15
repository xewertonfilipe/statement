import { render } from "@testing-library/react";

import * as transactionSlice from "./features/transactions/transactionSlice";
import Root from "./root.component";
import * as hooks from "./store/hooks";

const mockDispatch = jest.fn();

describe("Root component", () => {
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    dispatchSpy = jest
      .spyOn(hooks, "useAppDispatch")
      .mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it("should be in the document", () => {
    const { getByRole } = render(<Root />);

    expect(getByRole("heading", { name: /Extrato/i })).toBeInTheDocument();
  });

  it("dispatches fetchTransactions on mount", () => {
    const action = { type: "transactions/fetchTransactions/pending" };
    const fetchSpy = jest
      .spyOn(transactionSlice, "fetchTransactions")
      .mockReturnValue(
        action as unknown as ReturnType<
          typeof transactionSlice.fetchTransactions
        >
      );

    render(<Root />);

    expect(transactionSlice.fetchTransactions).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(action);

    fetchSpy.mockRestore();
  });

  it("refetches on transaction created event and removes listener on unmount", () => {
    const action = { type: "transactions/fetchTransactions/pending" };
    const fetchSpy = jest
      .spyOn(transactionSlice, "fetchTransactions")
      .mockReturnValue(
        action as unknown as ReturnType<
          typeof transactionSlice.fetchTransactions
        >
      );
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(<Root />);

    const eventCall = addEventListenerSpy.mock.calls.find(
      ([eventName]) => eventName === "bank:transaction:created"
    );

    expect(eventCall).toBeDefined();

    const handler = eventCall?.[1] as EventListener;
    handler(new Event("bank:transaction:created"));

    expect(mockDispatch).toHaveBeenCalledTimes(2);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "bank:transaction:created",
      handler
    );

    fetchSpy.mockRestore();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
