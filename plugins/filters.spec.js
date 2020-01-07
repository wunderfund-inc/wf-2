import {
  capitalize,
  properCase,
  asCurrency,
  asPercentage,
  regulationFormat,
  pluralFaq,
  paymentMethodFormat,
  einNumToStr
} from "./filters";

describe("testing filter functions", () => {
  describe("capitalizing strings", () => {
    it("returns a string in all caps", () => {
      const words = "Hello World!";
      expect(capitalize(words)).toBe("HELLO WORLD!");
    });
  });

  describe("proper casing strings", () => {
    it("returns only the first letter of the string capitalized", () => {
      const words = "esGro";
      expect(properCase(words)).toBe("Esgro");
    });
  });

  describe("convert number to dollars", () => {
    it("returns a string display of currency", () => {
      expect(asCurrency(100)).toBe("$100.00");
      expect(asCurrency(1000)).toBe("$1,000.00");
      expect(asCurrency(1000000)).toBe("$1,000,000.00");
    });
  });

  describe("convert number to percentage", () => {
    it("returns a string display of percentage", () => {
      expect(asPercentage(100)).toBe("100%");
      expect(asPercentage(5.96)).toBe("5.96%");
      expect(asPercentage(10)).toBe("10%");
    });
  });

  describe("add some string flavor to Regulation Types", () => {
    it("returns additional string messaging", () => {
      expect(regulationFormat("CF")).toBe("CF");
      expect(regulationFormat("D")).toBe("D");
      expect(regulationFormat("A")).toBe("A+");
    });
  });

  describe("pluralize FAQ menu links when needed", () => {
    it("correctly pluralizes FAQ menu", () => {
      expect(pluralFaq("general")).toBe("general");
      expect(pluralFaq("investor")).toBe("investors");
      expect(pluralFaq("company")).toBe("companies");
      expect(pluralFaq("legal")).toBe("legal");
    });
  });

  describe("format payment methods based on value", () => {
    it("adds context to ACH and Cryptocurrency transfers", () => {
      expect(paymentMethodFormat("ACH")).toBe("Bank Account (ACH)");
      expect(paymentMethodFormat("CHECK")).toBe("a Check");
      expect(paymentMethodFormat("WIRE")).toBe("a Wire Transfer");
      expect(paymentMethodFormat("CC")).toBe("Credit Card");
      expect(paymentMethodFormat("CRYPTO")).toBe("Cryptocurrency (Ethereum)");
    });
  });

  describe("format EIN numbers to a string", () => {
    it("adds a hyphen between 2nd and 3rd digit", () => {
      expect(einNumToStr(121234567)).toBe("12-1234567");
    });
  });
});
