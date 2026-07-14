jest.mock("single-spa-react", () => {
  return jest.fn(() => ({
    bootstrap: jest.fn(),
    mount: jest.fn(),
    unmount: jest.fn(),
  }));
});

import { bootstrap, mount, unmount } from "./bytebank-statement";

describe("bytebank-statement entrypoint", () => {
  it("exports single-spa lifecycles", () => {
    expect(typeof bootstrap).toBe("function");
    expect(typeof mount).toBe("function");
    expect(typeof unmount).toBe("function");
  });
});
