import {
  raiseCapitalFaqs,
  generalFaqs,
  companyFaqs,
  investorFaqs,
  faqLinks,
} from "./faqs";

describe("FAQs", () => {
  test("Raise Capital FAQ items", () => {
    expect(raiseCapitalFaqs.length).toBe(6);
  });

  test("General FAQ items", () => {
    expect(generalFaqs.length).toBe(5);
  });

  test("Company FAQ items", () => {
    expect(companyFaqs.length).toBe(24);
  });

  test("Investor FAQ items", () => {
    expect(investorFaqs.length).toBe(29);
  });

  test("FAQ links", () => {
    expect(faqLinks.length).toBe(5);
  });
});
