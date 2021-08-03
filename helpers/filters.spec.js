import {
  asCurrency,
  asPercentage,
  capitalize,
  currencyDisplayFormat,
  einNumToStr,
  firstLetterOnly,
  properCase,
  pluralFaq,
  paymentMethodFormat,
  regulationFormat,
  reduceToTotal,
  properIntegerFormat,
  timeDistance,
} from "./filters";

describe("testing filter functions", () => {
  describe("capitalizing strings", () => {
    test("returns a string in all caps", () => {
      const words = "Hello World!";
      expect(capitalize(words)).toBe("HELLO WORLD!");
    });
  });

  describe("proper casing strings", () => {
    test("returns only the first letter of the string capitalized", () => {
      expect(properCase("esGro")).toBe("Esgro");
    });
    test("edge cases", () => {
      expect(properCase("iot")).toBe("IoT");
    });
  });

  describe("convert number to dollars", () => {
    test("returns a string display of currency", () => {
      expect(asCurrency(100)).toBe("$100.00");
      expect(asCurrency(1000)).toBe("$1,000.00");
      expect(asCurrency(1000000)).toBe("$1,000,000.00");
    });
  });

  describe("convert number to percentage", () => {
    test("returns a string display of percentage", () => {
      expect(asPercentage(100)).toBe("100%");
      expect(asPercentage(5.96)).toBe("5.96%");
      expect(asPercentage(10)).toBe("10%");
    });
  });

  describe("add some string flavor to Regulation Types", () => {
    test("returns additional string messaging", () => {
      expect(regulationFormat("CF")).toBe("CF");
      expect(regulationFormat("D")).toBe("D");
      expect(regulationFormat("A")).toBe("A+");
    });
  });

  describe("pluralize FAQ menu links when needed", () => {
    test("correctly pluralizes FAQ menu", () => {
      expect(pluralFaq("general")).toBe("general");
      expect(pluralFaq("investor")).toBe("investors");
      expect(pluralFaq("company")).toBe("companies");
      expect(pluralFaq("legal")).toBe("legal");
    });
  });

  describe("format payment methods based on value", () => {
    test("adds context to ACH and Cryptocurrency transfers", () => {
      expect(paymentMethodFormat("ACH")).toBe("Bank Account (ACH)");
      expect(paymentMethodFormat("CHECK")).toBe("Check");
      expect(paymentMethodFormat("WIRE")).toBe("Wire Transfer");
      expect(paymentMethodFormat("CC")).toBe("Credit Card");
      expect(paymentMethodFormat("CRYPTO")).toBe("Cryptocurrency (Ethereum)");
    });
  });

  describe("format EIN numbers to a string", () => {
    test("adds a hyphen between 2nd and 3rd digit", () => {
      expect(einNumToStr(121234567)).toBe("12-1234567");
    });
  });

  describe("check currency display (reduced) is correct", () => {
    test("reduces a number", () => {
      expect(currencyDisplayFormat(10000)).toBe("$10.0K");
      expect(currencyDisplayFormat("10000")).toBe("$10.0K");
      expect(currencyDisplayFormat(10.01)).toBe("$10.0");
      expect(currencyDisplayFormat("10.01")).toBe("$10.0");
      expect(currencyDisplayFormat(2500000)).toBe("$2.5M");
    });

    test("gives back an error if not a number", () => {
      expect(() => currencyDisplayFormat("asd")).toThrow(TypeError);
      expect(() => currencyDisplayFormat("$2.0M")).toThrow(TypeError);
    });
  });

  test("first letters only function", () => {
    expect(firstLetterOnly(null)).toBe("");
    expect(firstLetterOnly("Justin")).toBe("J");
  });

  test("array amount reducer", () => {
    const data = [];
    expect(reduceToTotal(data)).toBe(0);
    data.push({ amount: 100 });
    data.push({ amount: 1000 });
    expect(reduceToTotal(data)).toBe(1100);
  });

  test("proper integer format", () => {
    expect(properIntegerFormat(1000000)).toBe("1.0M");
    expect(properIntegerFormat(100000)).toBe("100.0K");
    expect(properIntegerFormat(10000)).toBe("10.0K");
    expect(properIntegerFormat(1000)).toBe("1.0K");
    expect(properIntegerFormat(100)).toBe("100.0");
    expect(properIntegerFormat("1000000")).toBe("1.0M");
    expect(properIntegerFormat("100000")).toBe("100.0K");
    expect(properIntegerFormat("10000")).toBe("10.0K");
    expect(properIntegerFormat("1000")).toBe("1.0K");
    expect(properIntegerFormat("100")).toBe("100.0");
    expect(() => properIntegerFormat("asdf")).toThrow(TypeError);
    expect(() => properIntegerFormat("asdf")).toThrow("not a number");
    expect(() => properIntegerFormat("aw2wa")).toThrow(TypeError);
  });

  test("calculate time delta", () => {
    const result = new Date();
    result.setDate(result.getDate() + 1); // 1 day ahead
    expect(timeDistance(result.toLocaleDateString())).toBe("1 day");
  });

  test("payment method format", () => {
    expect(paymentMethodFormat("ACH")).toBe("Bank Account (ACH)");
    expect(paymentMethodFormat("CC")).toBe("Credit Card");
    expect(paymentMethodFormat("CHECK")).toBe("Check");
    expect(paymentMethodFormat("WIRE")).toBe("Wire Transfer");
    expect(paymentMethodFormat("CRYPTO")).toBe("Cryptocurrency (Ethereum)");
    expect(paymentMethodFormat("bananas")).toBe("Bananas");
  });
});
