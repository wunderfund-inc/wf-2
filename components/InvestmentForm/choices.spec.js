import { months, paymentMethods } from "./choices";

describe("choice data", () => {
  it("months", () => {
    expect(months.length).toEqual(13); // Including "Please Select" option.
  });

  it("payment methods", () => {
    expect(paymentMethods.length).toEqual(5);
  });
});
