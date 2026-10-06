import {
  raiseCapitalFaqs,
  generalFaqs,
  companyFaqs,
  investorFaqs,
  faqLinks,
} from "./faqs";

describe("FAQs", () => {
  test("Raise Capital FAQ items", () => {
    expect(raiseCapitalFaqs.length).toBe(5);
  });

  test("General FAQ items", () => {
    expect(generalFaqs.length).toBe(5);
  });

  test("Company FAQ items", () => {
    expect(companyFaqs.length).toBe(32);
  });

  test("Investor FAQ items", () => {
    expect(investorFaqs.length).toBe(36);
  });

  test("FAQ links", () => {
    expect(faqLinks.length).toBe(5);
  });

  test("rich answers are well-formed", () => {
    [...generalFaqs, ...companyFaqs, ...investorFaqs].forEach(({ answer }) => {
      if (typeof answer === "string") return;
      answer.forEach((block) => {
        expect(["p", "ul", "table"].some((k) => k in block)).toBe(true);
        if (block.table) {
          block.table.rows.forEach((row) =>
            expect(row.length).toBe(block.table.head.length)
          );
        }
      });
    });
  });
});
