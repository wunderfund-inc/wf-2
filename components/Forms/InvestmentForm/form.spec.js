import {
  validationError,
  success,
  required,
  minimum,
  canSpend,
  validateAmount,
  isFormValid,
  // investmentForm,
  amongst,
  allAgreed,
  validateAchAccount,
  validateAchRouting,
  validateCardName,
  validateCardNumber,
  validateExpiryMonth,
  validateExpiryYear,
  validateCVV,
  validateMethodDetails,
  validateCreditCard,
} from "./form";

describe("Investment Form", () => {
  describe("Required value", () => {
    const error = validationError("Required.");

    it("is invalid when null", () => {
      expect(required(null)).toEqual(error);
    });

    it("is invalid when undefined", () => {
      expect(required(undefined)).toEqual(error);
    });

    it("is invalid when empty string", () => {
      expect(required("")).toEqual(error);
    });

    it("is invalid amount is zero", () => {
      expect(required(0)).toEqual(error);
    });

    it("returns true when value is present", () => {
      expect(required("some value")).toEqual(success);
    });
  });

  describe("Minimum shares", () => {
    it("is invalid if less than minimum shares parameter", () => {
      expect(minimum(1, 2)).toEqual({
        valid: false,
        message: `Must be at least 2 shares.`,
      });
    });

    it("is valid when committed investment and minimum shares is equal", () => {
      expect(minimum(1, 1)).toEqual(success);
    });

    it("is valid when more than minimum shares", () => {
      expect(minimum(2, 1)).toEqual(success);
    });
  });

  describe("Relationship between committed amount and spend capacity", () => {
    const error = validationError("Cannot invest more than allowed.");

    it("is invalid if trying to invest more than user can spend", () => {
      expect(canSpend(2300, 2200)).toEqual(error);
    });

    it("is valid if trying to invest as much as one can spend", () => {
      expect(canSpend(2200, 2200)).toEqual(success);
    });

    it("is valid if trying to invest something under spend limit", () => {
      expect(canSpend(100, 2200)).toEqual(success);
    });
  });

  describe("Payment Method Choices", () => {
    const error = validationError("Not one of the choices.");

    it("is invalid if choices not amongst list", () => {
      expect(amongst("any value")).toEqual(error);
      expect(amongst(null)).toEqual(error);
      expect(amongst(undefined)).toEqual(error);
    });
    it("is valid if choices amongst the list", () => {
      expect(amongst("CC")).toEqual(success);
      expect(amongst("ACH")).toEqual(success);
      expect(amongst("CHECK")).toEqual(success);
      expect(amongst("WIRE")).toEqual(success);
      expect(amongst("CRYPTO")).toEqual(success);
    });
  });

  describe("Payment Method Details", () => {
    describe("ACH", () => {
      it("invalid routing numbers", () => {
        const error = validationError("Invalid routing number.");
        expect(validateAchRouting("")).toEqual(error);
        expect(validateAchRouting("110000009")).toEqual(error);
      });

      it("valid routing numbers", () => {
        expect(validateAchRouting("110000000")).toEqual(success);
        expect(validateAchRouting("072403004")).toEqual(success);
        expect(validateAchRouting("021000021")).toEqual(success);
        expect(validateAchRouting("011401533")).toEqual(success);
        expect(validateAchRouting("091000019")).toEqual(success);
      });

      it("invalid account numbers", () => {
        const error = validationError("Invalid account number.");
        expect(validateAchAccount("12")).toEqual(error);
        expect(validateAchAccount("123456789012345678")).toEqual(error);
      });

      it("valid account numbers", () => {
        expect(validateAchAccount("000123456789")).toEqual(success);
        expect(validateAchAccount("000111111116")).toEqual(success);
        expect(validateAchAccount("000111111113")).toEqual(success);
        expect(validateAchAccount("000222222227")).toEqual(success);
        expect(validateAchAccount("000333333335")).toEqual(success);
        expect(validateAchAccount("000444444440")).toEqual(success);
        expect(validateAchAccount("856667")).toEqual(success);
      });
    });

    describe("Credit Card", () => {
      it("invalid Cardholder Name", () => {
        const requiredError = {
          valid: false,
          message: "Required.",
        };

        const regexError = {
          valid: false,
          message: "Invalid cardholder name.",
        };

        expect(validateCardName(undefined)).toEqual(requiredError);
        expect(validateCardName(null)).toEqual(requiredError);
        expect(validateCardName("")).toEqual(requiredError);
        expect(validateCardName(";!@#$%")).toEqual(regexError);
        expect(validateCardName("R2-D2")).toEqual(regexError);
        expect(validateCardName("J")).toEqual(regexError);
        expect(validateCardName("-")).toEqual(regexError);
      });

      it("valid Cardholder Name", () => {
        expect(validateCardName("asdfjkl")).toEqual(success);
        expect(validateCardName("Jon")).toEqual(success);
        expect(validateCardName("D'Artagnan")).toEqual(success);
      });

      it("invalid Cardholder Number", () => {
        const error = validationError(
          "Invalid cardholder number. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
        );

        const amexError = validationError(
          "We do not accept American Express. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
        );

        expect(validateCardNumber("1234123412341234")).toEqual(error);
        expect(validateCardNumber("2345234523452345")).toEqual(error);
        expect(validateCardNumber("7890789078907890")).toEqual(error);
        expect(validateCardNumber("8901890189018901")).toEqual(error);
        expect(validateCardNumber("9012901290129012")).toEqual(error);
        expect(validateCardNumber("0123012301230123")).toEqual(error);
        expect(validateCardNumber("371449635398431")).toEqual(amexError);
        expect(validateCardNumber("378282246310005")).toEqual(amexError);
        expect(validateCardNumber("371449635398431")).toEqual(amexError);
        expect(validateCardNumber("378734493671000")).toEqual(amexError);
      });

      it("valid Cardholder Number", () => {
        expect(validateCardNumber("4003830171874018")).toEqual(success);
        expect(validateCardNumber("4012888888881881")).toEqual(success);
        expect(validateCardNumber("4111111111111111")).toEqual(success);
        expect(validateCardNumber("5496198584584769")).toEqual(success);
        expect(validateCardNumber("6011111111111117")).toEqual(success);
        expect(validateCardNumber("6011000990139424")).toEqual(success);
        expect(validateCardNumber("4242424242424242")).toEqual(success);
        expect(validateCardNumber("5555555555554444")).toEqual(success);
        expect(validateCardNumber("5105105105105100")).toEqual(success);
      });

      it("invalid Expiry Month", () => {
        const requiredError = validationError("Required.");
        const typeError = validationError("Must be of type String.");
        const isBetweenError = validationError("Must be between 01 and 12.");

        expect(validateExpiryMonth(null)).toEqual(requiredError);
        expect(validateExpiryMonth(undefined)).toEqual(requiredError);
        expect(validateExpiryMonth(0)).toEqual(requiredError);
        expect(validateExpiryMonth(1)).toEqual(typeError);
        expect(validateExpiryMonth(10)).toEqual(typeError);
        expect(validateExpiryMonth("0")).toEqual(isBetweenError);
        expect(validateExpiryMonth("00")).toEqual(isBetweenError);
        expect(validateExpiryMonth("13")).toEqual(isBetweenError);
      });

      it("valid Expiry Month", () => {
        expect(validateExpiryMonth("01")).toEqual(success);
        expect(validateExpiryMonth("02")).toEqual(success);
        expect(validateExpiryMonth("03")).toEqual(success);
        expect(validateExpiryMonth("04")).toEqual(success);
        expect(validateExpiryMonth("05")).toEqual(success);
        expect(validateExpiryMonth("06")).toEqual(success);
        expect(validateExpiryMonth("07")).toEqual(success);
        expect(validateExpiryMonth("08")).toEqual(success);
        expect(validateExpiryMonth("09")).toEqual(success);
        expect(validateExpiryMonth("10")).toEqual(success);
        expect(validateExpiryMonth("11")).toEqual(success);
        expect(validateExpiryMonth("12")).toEqual(success);
      });

      it("invalid Expiry Year", () => {
        const error = validationError("Invalid expiry year.");
        const typeError = validationError("Must be of type String.");

        expect(validateExpiryYear("20")).toEqual(error);
        expect(validateExpiryYear(21)).toEqual(typeError);
      });

      it("valid Expiry Year", () => {
        const year = new Date().getFullYear() % 100;
        expect(validateExpiryYear(String(year))).toEqual(success);
      });

      it("invalid CVV", () => {
        const error = validationError("Invalid CVV number.");
        expect(validateCVV("12")).toEqual(error);
        expect(validateCVV("1234")).toEqual(error);
      });

      it("valid CVV", () => {
        expect(validateCVV("123")).toEqual(success);
      });
    });
  });

  describe("Attestations", () => {
    const error = validationError(
      "You must agree to all attestations before investing."
    );

    it("is invalid if not every checkbox is checked", () => {
      const attestations = ["attestation 1", "attestation 2", "attestation 3"];
      expect(allAgreed(attestations)).toEqual(error);
      attestations.push("attestation 4");
      expect(allAgreed(attestations, true)).toEqual(error);
      const attestations2 = [null, "asdf", "asdf", "asdf"];
      expect(allAgreed(attestations2)).toEqual(error);
      const attestations3 = [undefined, "asdf", "asdf", "asdf"];
      expect(allAgreed(attestations3)).toEqual(error);
    });

    it("is valid if every checkbox is checked", () => {
      const attestations = ["att 1", "att 2", "att 3", "att 4"];
      expect(allAgreed(attestations)).toEqual(success);
      attestations.push("att 5");
      expect(allAgreed(attestations, true)).toEqual(success);
    });
  });

  describe("Validate combined parameters", () => {
    it("invalid amounts", () => {
      expect(validateAmount(null, 1, 100, 2200)).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateAmount(undefined, 1, 100, 2200)).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateAmount(0, 0, 100, 2200)).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateAmount(100, 400, 100, 2200)).toEqual({
        valid: false,
        message: "Must be at least 400 shares.",
      });

      expect(validateAmount(1, 1, 1, 0)).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });

      expect(validateAmount(23, 1, 100, 2200)).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });

      expect(validateAmount(1, 1, 100, 0)).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });
    });

    it("valid amounts", () => {
      expect(validateAmount(1, 1, 100, 2200)).toEqual({ valid: true });
      expect(validateAmount(1, 1, 100, 100)).toEqual({ valid: true });
      expect(validateAmount(22, 1, 100, 2200)).toEqual({ valid: true });
      expect(validateAmount(21, 1, 100, 2200)).toEqual({ valid: true });
    });

    describe("method details (combined inputs)", () => {
      it("invalid ACH", () => {
        const error = {
          valid: false,
          message: "Invalid ACH credentials.",
        };
        const ach = {
          account: "12345678",
          routing: "123456789",
        };
        expect(validateMethodDetails("ACH", ach)).toEqual(error);
      });

      it("valid ACH", () => {
        const ach = {
          account: "000123456789",
          routing: "110000000",
        };
        expect(validateMethodDetails("ACH", ach)).toEqual({ valid: true });
      });

      it("invalid Credit Card", () => {
        const year = String(new Date().getFullYear() % 100);
        const error = {
          valid: false,
          message: "Invalid Credit Card credentials.",
        };

        const cc1 = {
          name: "",
          number: "4242424242424242",
          month: "09",
          year,
          cvv: "222",
        };
        expect(validateCreditCard(cc1)).toEqual(error);

        const cc2 = {
          ...cc1,
          name: "Justin Chiou",
          number: "424242424242424",
        };
        expect(validateCreditCard(cc2)).toEqual(error);

        const cc3 = {
          ...cc2,
          number: "4242424242424242",
          month: "00",
        };
        expect(validateCreditCard(cc3)).toEqual(error);

        const cc4 = {
          ...cc3,
          month: "08",
          year: "20",
        };
        expect(validateCreditCard(cc4)).toEqual(error);

        const cc5 = {
          ...cc4,
          year,
          cvv: "1234",
        };
        expect(validateCreditCard(cc5)).toEqual(error);
      });

      it("valid Credit Card", () => {
        const year = String(new Date().getFullYear() % 100);
        const cc = {
          name: "Justin Chiou",
          number: "4242424242424242",
          month: "09",
          year,
          cvv: "222",
        };

        expect(validateCreditCard(cc)).toEqual({ valid: true });
      });

      it("invalid if not amongst choices of payment methods", () => {
        const error = {
          valid: false,
          message: "Invalid payment method.",
        };
        const ach = { account: "", routing: "" };
        expect(validateMethodDetails("", ach)).toEqual(error);
        expect(validateMethodDetails("asdf", ach)).toEqual(error);
        expect(validateMethodDetails(null, ach)).toEqual(error);
        expect(validateMethodDetails(undefined, ach)).toEqual(error);
      });

      it("valid if CHECK or WIRE", () => {
        expect(validateMethodDetails("CHECK", null)).toEqual({ valid: true });
        expect(validateMethodDetails("CHECK", {})).toEqual({ valid: true });
        expect(validateMethodDetails("WIRE", null)).toEqual({ valid: true });
        expect(validateMethodDetails("WIRE", {})).toEqual({ valid: true });
      });
    });
  });

  describe("Validate form", () => {
    it("returns true when all parameters are valid", () => {
      const formState = {
        amount: { valid: true },
        method: { valid: true },
        methodDetails: { valid: true },
        attestations: { valid: true },
      };
      expect(isFormValid(formState)).toBe(true);
    });

    it("returns false when some/all parameters are invalid", () => {
      const formState1 = {
        amount: { valid: false },
        method: { valid: true },
        methodDetails: { valid: true },
        attestations: { valid: true },
      };
      const formState2 = {
        amount: { valid: true },
        method: { valid: false },
        methodDetails: { valid: true },
        attestations: { valid: true },
      };
      const formState3 = {
        amount: { valid: true },
        method: { valid: true },
        methodDetails: { valid: false },
        attestations: { valid: true },
      };
      const formState4 = {
        amount: { valid: true },
        method: { valid: true },
        methodDetails: { valid: true },
        attestations: { valid: false },
      };
      expect(isFormValid(formState1)).toBe(false);
      expect(isFormValid(formState2)).toBe(false);
      expect(isFormValid(formState3)).toBe(false);
      expect(isFormValid(formState4)).toBe(false);
    });
  });

  // describe("Form Logic", () => {
  //   const user = {
  //     annualIncome: 0,
  //     netWorth: 0,
  //   };
  //   const offering = {
  //     pricePerShare: 100,
  //     minShares: 1,
  //   };
  //   const investment = {
  //     amount: 1,
  //   };

  //   it("is valid when using valid investment amount", () => {
  //     const form = investmentForm(user, offering, investment);
  //     expect(form).toEqual({ amount: { valid: true } });
  //   });

  //   it("is invalid when overcommitting", () => {
  //     const form = investmentForm(user, offering, {
  //       ...investment,
  //       amount: 23,
  //     });
  //     expect(form).toEqual({
  //       amount: {
  //         valid: false,
  //         message: "Cannot invest more than allowed.",
  //       },
  //     });
  //   });

  //   it("is invalid when amount is invalid", () => {
  //     const form = investmentForm(
  //       user,
  //       { pricePerShare: 100, minShares: 10 },
  //       { ...investment, amount: 1 }
  //     );
  //     expect(form).toEqual({
  //       amount: {
  //         valid: false,
  //         message: "Must be at least 10 shares.",
  //       },
  //     });
  //   });
  // });
});
