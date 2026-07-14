import { render } from "@testing-library/react";

import { Transaction } from ".";

describe("Transaction component", () => {
  it("formats month, date and BRL currency", () => {
    const { getByText } = render(
      <Transaction
        transaction={{
          id: 1,
          value: 1234.56,
          type: "deposito",
          date: new Date("2026-01-15T12:00:00.000Z"),
        }}
      />
    );

    expect(getByText(/janeiro/i)).toBeInTheDocument();
    expect(getByText("15/01/2026")).toBeInTheDocument();
    expect(getByText(/R\$\s?1\.234,56/i)).toBeInTheDocument();
    expect(getByText(/deposito/i)).toBeInTheDocument();
  });
});
