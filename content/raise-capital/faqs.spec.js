import { faqs } from "./faqs";

describe("Raise Capital FAQs", () => {
  test("has 6 items", () => {
    expect(faqs.length).toEqual(6);
  });
});
