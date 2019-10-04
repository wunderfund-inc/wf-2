import {
  capitalize,
  properCase,
  asCurrency,
  asPercentage,
  regulationFormat
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
      expect(regulationFormat("CF")).toBe("Reg CF");
      expect(regulationFormat("D")).toBe("Reg D");
      expect(regulationFormat("A")).toBe("Reg A+");
    });
  });
});
