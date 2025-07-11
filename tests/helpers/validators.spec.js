import {
  accredited,
  endedAlready,
  endingSoon,
  isBetween,
  oneYearPassed,
  validAchAccountNumber,
  validAchRoutingNumber,
  validAttestations,
  validCreditCard,
  validCVV,
  validEmail,
  validEthereumAddress,
  validMonth,
  validNumber,
  validPostal,
  validYear,
} from "@/helpers/validators";

describe("testing validator functions", () => {
  describe("test Zip Code Input", () => {
    it("test valid values", () => {
      const data = ["12345", 12345, "12345-1234"];
      data.forEach((el) => expect(validPostal(el)).toBeTruthy());
    });

    it("test invalid values", () => {
      const data = ["1234", 112, "12345-1", null];
      data.forEach((el) => expect(validPostal(el)).toBeFalsy());
    });
  });

  describe("test Email Input", () => {
    it("valid inputs", () => {
      const data = [
        "taylor@wunderfund.co",
        "taylor@gmail.com",
        "test@example.com",
      ];
      data.forEach((el) => expect(validEmail(el)).toBeTruthy());
    });

    it("invalid inputs", () => {
      const data = ["taylor@wunderfund.c", "taylor@wunderfund", "taylor"];
      data.forEach((el) => expect(validEmail(el)).toBeFalsy());
    });
  });

  describe("test Accreditation", () => {
    it("test Accredited inputs", () => {
      const data = [
        { ai: 0, nw: 0, expected: false },
        { ai: 200000, nw: 0, expected: false },
        { ai: 0, nw: 1000000, expected: false },
        { ai: 200000, nw: 1000000, expected: true },
      ];
      data.forEach((el) => expect(accredited(el.ai, el.nw)).toBe(el.expected));
      expect(accredited()).toBe(false);
    });
  });

  describe("test Method Extra validators (when investing)", () => {
    it("ACH Account Numbers", () => {
      const data = [
        { n: "123", expected: false },
        { n: "1234", expected: true },
        { n: "12345678901234567", expected: true },
        { n: "123456789012345678", expected: false },
        { n: null, expected: false },
      ];
      data.forEach(function (el) {
        expect(validAchAccountNumber(el.n)).toBe(el.expected);
      });
    });

    it("ACH Routing Numbers", () => {
      const data = [
        { n: "614321634", expected: true },
        { n: "114000900", expected: true },
        { n: "703452098", expected: true },
        { n: "1145329", expected: false },
        { n: "491212012", expected: false },
        { n: "banana", expected: false },
        { n: null, expected: false },
      ];
      data.forEach(function (el) {
        expect(validAchRoutingNumber(el.n)).toBe(el.expected);
      });
    });

    describe("Credit Card Transactions", () => {
      const dto = {
        name: "Justin Chiou",
        number: "4242424242424242",
        month: "02",
        year: String(new Date().getFullYear() - 2000),
        cvv: "123",
      };

      it("Valid Credit Card", () => {
        expect(validCreditCard(dto)).toBe(true);
        dto.number = "6011000000000004";
        expect(validCreditCard(dto)).toBe(true);
        dto.number = "5500000000000004";
        expect(validCreditCard(dto)).toBe(true);
      });
      it("Invalid Name", () => {
        dto.name = "TJ";
        expect(validCreditCard(dto)).toBe(false);
        dto.name = null;
        expect(validCreditCard(dto)).toBe(false);
      });
      it("Invalid Number", () => {
        dto.number = "4242";
        expect(validCreditCard(dto)).toBe(false);
        dto.number = null;
        expect(validCreditCard(dto)).toBe(false);
      });
      it("Invalid Month", () => {
        dto.month = "00";
        expect(validCreditCard(dto)).toBe(false);
        dto.month = null;
        expect(validCreditCard(dto)).toBe(false);
        dto.month = "";
        expect(validCreditCard(dto)).toBe(false);
        dto.month = undefined;
        expect(validCreditCard(dto)).toBe(false);
      });
      it("Invalid Year", () => {
        dto.year = "19";
        expect(validCreditCard(dto)).toBe(false);
        dto.year = null;
        expect(validCreditCard(dto)).toBe(false);
      });
      it("Invalid CVV", () => {
        dto.cvv = "aaa";
        expect(validCreditCard(dto)).toBe(false);
        dto.cvv = null;
        expect(validCreditCard(dto)).toBe(false);
      });
    });

    it("Cryptocurrency Transactions (Ethereum)", () => {
      const data = [
        { a: "0x52908400098527886E0F7030069857D2E4169EE7", expected: true },
        { a: "0x52908400098527886E0F7030069857D2E4169EE", expected: false },
        { a: null, expected: false },
        { a: undefined, expected: false },
      ];
      data.forEach((el) =>
        expect(validEthereumAddress(el.a)).toBe(el.expected)
      );
    });
  });

  describe("Attestations", () => {
    it("test attestations", () => {
      const data = [
        { d: null, expected: false },
        { d: undefined, expected: false },
        { d: [null], expected: false },
        { d: [], expected: false },
        { d: [false, false, false, false, false], expected: false },
        { d: ["asdf", false, false, false, false], expected: false },
        { d: ["asdf", "asdf", false, false, false], expected: false },
        { d: ["asdf", "asdf", "asdf", false, false], expected: false },
        { d: ["asdf", "asdf", "asdf", "asdf", false], expected: false },
        { d: ["asdf", "asdf", "asdf", "asdf", "asdf"], expected: true },
      ];
      data.forEach((el) => expect(validAttestations(el.d)).toBe(el.expected));
    });
  });

  describe("testing oneYearPassed function", () => {
    it("validate", () => {
      // const now = new Date().getTime() / 1000; // in seconds

      expect(oneYearPassed(1)).toBe(true);
      // expect(oneYearPassed(now - 364 * 24 * 60 * 60)).toBe(false);
      // expect(oneYearPassed(now - 365 * 24 * 60 * 60)).toBe(true);
      // expect(oneYearPassed(now - 366 * 24 * 60 * 60)).toBe(true);
    });
  });

  describe("testing if a campaign ended already", () => {
    test("endedAlready function", () => {
      expect(endedAlready("2020-01-01")).toBe(true);
    });
    test("endingSoon function", () => {
      expect(endingSoon("2021-04-01")).toBe(true);
    });
  });

  describe("testing a credit card number individually", () => {
    test("valid numbers", () => {
      expect(validNumber("4242424242424242")).toBe(true);
      expect(validNumber("5500000000000004")).toBe(true);
      expect(validNumber("6011000000000004")).toBe(true);
    });
    test("invalid numbers", () => {
      expect(validNumber("")).toBe(false);
      expect(validNumber("1234")).toBe(false);
      expect(validNumber(null)).toBe(false);
      expect(validNumber(undefined)).toBe(false);
      expect(validNumber("371449635398431")).toBe(false);
    });
  });

  describe("smaller functions", () => {
    test("isBetween", () => {
      expect(isBetween()).toBe(true);
    });

    test("validMonth", () => {
      expect(validMonth()).toBe(false);
      expect(validMonth("02")).toBe(true);
      expect(validMonth(2)).toBe(false);
    });

    test("validYear", () => {
      expect(validYear()).toBe(false);
      expect(validYear("21")).toBe(true);
      expect(validYear("99")).toBe(true);
    });

    test("validCVV", () => {
      expect(validCVV()).toBe(false);
      expect(validCVV("123")).toBe(true);
      expect(validCVV("99")).toBe(false);
      expect(validCVV("1234")).toBe(false);
      expect(validCVV(null)).toBe(false);
      expect(validCVV(undefined)).toBe(false);
    });
  });
});
