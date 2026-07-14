import { render } from "@testing-library/react";

import { Statement } from ".";

describe("Statement component", () => {
  it("shows loading state", () => {
    const { getByText } = render(
      <Statement transactions={[]} status="loading" error={null} />
    );

    expect(getByText(/Carregando extrato/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    const { getByText } = render(
      <Statement
        transactions={[]}
        status="failed"
        error="Nao foi possivel carregar o extrato."
      />
    );

    expect(
      getByText(/Nao foi possivel carregar o extrato\./i)
    ).toBeInTheDocument();
  });

  it("renders transaction list items", () => {
    const { getByText } = render(
      <Statement
        transactions={[
          {
            id: 1,
            value: 120,
            type: "deposito",
            date: new Date("2026-07-14T08:47:46.310Z"),
          },
        ]}
        status="succeeded"
        error={null}
      />
    );

    expect(getByText(/Extrato/i)).toBeInTheDocument();
    expect(getByText(/deposito/i)).toBeInTheDocument();
  });
});
