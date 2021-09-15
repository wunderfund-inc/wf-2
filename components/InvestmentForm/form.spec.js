import {
  invalidState,
  validState,
  required,
  minimum,
  minimumNonEquity,
  canSpend,
  canInvest,
  validateEquityAmount,
  validateNonEquityAmount,
  isFormValid,
  investmentForm,
  amongst,
  allAgreed,
  validateAchAccount,
  validateAchRouting,
  validateCardName,
  validateCardNumber,
  validateExpiryMonth,
  validateExpiryYear,
  validateCVV,
  validateExpiry,
  validateMethodDetails,
  validateCreditCard,
  validateSSN,
} from "./form";

describe("Investment Form", () => {
  describe("testing form state", () => {
    test("valid state works", () => {
      expect(validState).toEqual({ valid: true });
    });

    test("invalid state works", () => {
      expect(invalidState()).toEqual({ valid: false });
    });

    test("invalid state works when a message is given", () => {
      const state = { valid: false, message: "required" };
      expect(invalidState("required")).toEqual(state);
    });
  });

  describe("Required value", () => {
    const error = invalidState("Required.");

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
      expect(required("some value")).toEqual(validState);
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
      expect(minimum(1, 1)).toEqual(validState);
    });

    it("is valid when more than minimum shares", () => {
      expect(minimum(2, 1)).toEqual(validState);
    });
  });

  describe("Minimum raw dollar amount", () => {
    it("is invalid if less than minimum amount necessary", () => {
      expect(minimumNonEquity(99, 100)).toEqual({
        valid: false,
        message: `Must be at least $100 minimum.`,
      });
    });

    it("is valid when amount and minimum amount is equal", () => {
      expect(minimumNonEquity(100, 100)).toEqual(validState);
    });

    it("is valid when greater than minimum amount", () => {
      expect(minimumNonEquity(101, 100)).toEqual(validState);
    });
  });

  describe("Relationship between committed amount and spend capacity", () => {
    const error = invalidState("Cannot invest more than allowed.");

    it("is invalid if trying to invest more than user can spend", () => {
      expect(canSpend(2300, 2200)).toEqual(error);
    });

    it("is valid if trying to invest as much as one can spend", () => {
      expect(canSpend(2200, 2200)).toEqual(validState);
    });

    it("is valid if trying to invest something under spend limit", () => {
      expect(canSpend(100, 2200)).toEqual(validState);
    });
  });

  describe("Payment Method Choices", () => {
    const error = invalidState("Not one of the choices.");

    it("is invalid if choices not amongst list", () => {
      expect(amongst("any value")).toEqual(error);
      expect(amongst(null)).toEqual(error);
      expect(amongst(undefined)).toEqual(error);
    });
    it("is valid if choices amongst the list", () => {
      expect(amongst("CC")).toEqual(validState);
      expect(amongst("ACH")).toEqual(validState);
      expect(amongst("CHECK")).toEqual(validState);
      expect(amongst("WIRE")).toEqual(validState);
      expect(amongst("CRYPTO")).toEqual(validState);
    });
  });

  describe("Payment Method Details", () => {
    describe("ACH", () => {
      it("invalid routing numbers", () => {
        const error = invalidState("Invalid routing number.");
        expect(validateAchRouting(null)).toEqual(invalidState());
        expect(validateAchRouting("")).toEqual(invalidState());
        expect(validateAchRouting("110000009")).toEqual(error);
      });

      it("valid routing numbers", () => {
        expect(validateAchRouting("110000000")).toEqual(validState);
        expect(validateAchRouting("072403004")).toEqual(validState);
        expect(validateAchRouting("021000021")).toEqual(validState);
        expect(validateAchRouting("011401533")).toEqual(validState);
        expect(validateAchRouting("091000019")).toEqual(validState);
      });

      it("invalid account numbers", () => {
        expect(validateAchAccount(null).valid).toBeFalsy();
        expect(validateAchAccount(undefined).valid).toBeFalsy();
        expect(validateAchAccount("12").valid).toBeFalsy();
        expect(validateAchAccount("123456789012345678").valid).toBeFalsy();
      });

      it("valid account numbers", () => {
        expect(validateAchAccount("000123456789")).toEqual(validState);
        expect(validateAchAccount("000111111116")).toEqual(validState);
        expect(validateAchAccount("000111111113")).toEqual(validState);
        expect(validateAchAccount("000222222227")).toEqual(validState);
        expect(validateAchAccount("000333333335")).toEqual(validState);
        expect(validateAchAccount("000444444440")).toEqual(validState);
        expect(validateAchAccount("856667")).toEqual(validState);
      });
    });

    describe("Credit Card", () => {
      it("invalid Cardholder Name", () => {
        const regexError = {
          valid: false,
          message: "Invalid cardholder name.",
        };

        expect(validateCardName(undefined)).toEqual(invalidState());
        expect(validateCardName(null)).toEqual(invalidState());
        expect(validateCardName("")).toEqual(invalidState());
        expect(validateCardName(";!@#$%")).toEqual(regexError);
        expect(validateCardName("R2-D2")).toEqual(regexError);
        expect(validateCardName("J")).toEqual(regexError);
        expect(validateCardName("-")).toEqual(regexError);
      });

      it("valid Cardholder Name", () => {
        expect(validateCardName("asdfjkl").valid).toBeTruthy();
        expect(validateCardName("Jon").valid).toBeTruthy();
        expect(validateCardName("D'Artagnan").valid).toBeTruthy();
      });

      it("invalid Cardholder Number", () => {
        const error = invalidState(
          "Invalid cardholder number. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
        );

        const amexError = invalidState(
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
        expect(validateCardNumber(null).valid).toBeFalsy();
        expect(validateCardNumber(undefined).valid).toBeFalsy();
      });

      it("valid Cardholder Number", () => {
        expect(validateCardNumber("4003830171874018").valid).toBeTruthy();
        expect(validateCardNumber("4012888888881881").valid).toBeTruthy();
        expect(validateCardNumber("4111111111111111").valid).toBeTruthy();
        expect(validateCardNumber("5496198584584769").valid).toBeTruthy();
        expect(validateCardNumber("6011111111111117").valid).toBeTruthy();
        expect(validateCardNumber("6011000990139424").valid).toBeTruthy();
        expect(validateCardNumber("4242424242424242").valid).toBeTruthy();
        expect(validateCardNumber("5555555555554444").valid).toBeTruthy();
        expect(validateCardNumber("5105105105105100").valid).toBeTruthy();
      });

      it("invalid Expiry Month", () => {
        expect(validateExpiryMonth(null).valid).toBeFalsy();
        expect(validateExpiryMonth(undefined).valid).toBeFalsy();
        expect(validateExpiryMonth("0A").valid).toBeFalsy();
        expect(validateExpiryMonth(0).valid).toBeFalsy();
        expect(validateExpiryMonth("0").valid).toBeFalsy();
        expect(validateExpiryMonth("00").valid).toBeFalsy();
        expect(validateExpiryMonth("13").valid).toBeFalsy();
      });

      it("valid Expiry Month", () => {
        expect(validateExpiryMonth(1)).toEqual(validState);
        expect(validateExpiryMonth(2)).toEqual(validState);
        expect(validateExpiryMonth(3)).toEqual(validState);
        expect(validateExpiryMonth(4)).toEqual(validState);
        expect(validateExpiryMonth(5)).toEqual(validState);
        expect(validateExpiryMonth(6)).toEqual(validState);
        expect(validateExpiryMonth(7)).toEqual(validState);
        expect(validateExpiryMonth(8)).toEqual(validState);
        expect(validateExpiryMonth(9)).toEqual(validState);
        expect(validateExpiryMonth(10)).toEqual(validState);
        expect(validateExpiryMonth(11)).toEqual(validState);
        expect(validateExpiryMonth(12)).toEqual(validState);
        expect(validateExpiryMonth("01")).toEqual(validState);
        expect(validateExpiryMonth("02")).toEqual(validState);
        expect(validateExpiryMonth("03")).toEqual(validState);
        expect(validateExpiryMonth("04")).toEqual(validState);
        expect(validateExpiryMonth("05")).toEqual(validState);
        expect(validateExpiryMonth("06")).toEqual(validState);
        expect(validateExpiryMonth("07")).toEqual(validState);
        expect(validateExpiryMonth("08")).toEqual(validState);
        expect(validateExpiryMonth("09")).toEqual(validState);
        expect(validateExpiryMonth("10")).toEqual(validState);
        expect(validateExpiryMonth("11")).toEqual(validState);
        expect(validateExpiryMonth("12")).toEqual(validState);

        const currentMonth = new Date().getMonth() + 1;
        expect(validateExpiryMonth(currentMonth).valid).toBeTruthy();
      });

      it("invalid Expiry Year", () => {
        expect(validateExpiryYear(null).valid).toBeFalsy();
        expect(validateExpiryYear(undefined).valid).toBeFalsy();
        expect(validateExpiryYear("20").valid).toBeFalsy();
        expect(validateExpiryYear(20).valid).toBeFalsy();
      });

      it("valid Expiry Year", () => {
        const year = new Date().getFullYear() % 100;
        expect(validateExpiryYear(year).valid).toBeTruthy();
        expect(validateExpiryYear(21).valid).toBeTruthy();
      });

      it("invalid CVV", () => {
        expect(validateCVV(null).valid).toBeFalsy();
        expect(validateCVV(undefined).valid).toBeFalsy();
        expect(validateCVV("12").valid).toBeFalsy();
        expect(validateCVV("1234").valid).toBeFalsy();
      });

      it("valid CVV", () => {
        expect(validateCVV("123")).toEqual(validState);
      });

      it("invalid expiry combination (month and year)", () => {
        expect(validateExpiry(12, 20).valid).toBeFalsy();
        expect(validateExpiry("01", "21").valid).toBeFalsy();
        expect(validateExpiry("12", "20").valid).toBeFalsy();
      });

      it("valid expiry combination (month and year)", () => {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear() % 100;

        expect(validateExpiry(month, year).valid).toBeTruthy();
        expect(validateExpiry(month, year + 1).valid).toBeTruthy();
        expect(validateExpiry(month, year + 100).valid).toBeTruthy();
      });
    });
  });

  describe("Attestations", () => {
    it("is invalid if not every checkbox is checked", () => {
      expect(allAgreed().valid).toBeFalsy();
      expect(
        allAgreed(["attestation 1", "attestation 2", "attestation 3"]).valid
      ).toBeFalsy();
      expect(
        allAgreed([
          "attestation 1",
          "attestation 2",
          "attestation 3",
          "attestation 4",
        ]).valid
      ).toBeFalsy();
      expect(allAgreed([null, "asdf", "asdf", "asdf"]).valid).toBeFalsy();
      expect(allAgreed([undefined, "asdf", "asdf", "asdf"]).valid).toBeFalsy();
    });

    it("is valid if every checkbox is checked", () => {
      const attestations = ["att 1", "att 2", "att 3", "att 4", "att 5"];
      expect(allAgreed(attestations).valid).toBeTruthy();
    });
  });

  describe("Validate combined parameters", () => {
    it("invalid equity investments", () => {
      expect(validateEquityAmount(null, 1, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateEquityAmount(undefined, 1, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateEquityAmount(0, 0, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Required.",
      });

      expect(validateEquityAmount(100, 400, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Must be at least 400 shares.",
      });

      expect(validateEquityAmount(1, 1, 1, 0, "WIRE")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });

      expect(validateEquityAmount(23, 1, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });

      expect(validateEquityAmount(1, 1, 100, 0, "WIRE")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });

      expect(validateEquityAmount(51, 1, 100, 2200, "CC")).toEqual({
        valid: false,
        message: "Cannot invest any amount over $5,000.00 using a credit card.",
      });

      expect(validateEquityAmount(50, 1, 100, 2200, "CC")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });
    });

    it("valid equity investments", () => {
      expect(validateEquityAmount(1, 1, 100, 2200, "CC")).toEqual({
        valid: true,
      });
      expect(validateEquityAmount(1, 1, 100, 100, "CC")).toEqual({
        valid: true,
      });
      expect(validateEquityAmount(22, 1, 100, 2200, "CC")).toEqual({
        valid: true,
      });
      expect(validateEquityAmount(21, 1, 100, 2200, "CC")).toEqual({
        valid: true,
      });
      expect(validateEquityAmount(50, 1, 100, 10000, "CC")).toEqual({
        valid: true,
      });
    });

    it("invalid non-equity investments", () => {
      expect(validateNonEquityAmount(null, 100, 2200, "WIRE")).toEqual({
        valid: false,
      });
      expect(validateNonEquityAmount(undefined, 100, 2200, "WIRE")).toEqual({
        valid: false,
      });
      expect(validateNonEquityAmount(0, 100, 2200, "WIRE")).toEqual({
        valid: false,
      });
      expect(validateNonEquityAmount(99, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Must be at least $100 minimum.",
      });
      expect(validateNonEquityAmount(2201, 100, 2200, "WIRE")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });
      expect(validateNonEquityAmount(5000.01, 100, 10000, "CC")).toEqual({
        valid: false,
        message: "Cannot invest any amount over $5,000.00 using a credit card.",
      });
      expect(validateNonEquityAmount(5000, 100, 2200, "CC")).toEqual({
        valid: false,
        message: "Cannot invest more than allowed.",
      });
    });

    it("valid non-equity investments", () => {
      expect(validateNonEquityAmount(100, 100, 2200)).toEqual({ valid: true });
      expect(validateNonEquityAmount(101, 100, 2200)).toEqual({ valid: true });
      expect(validateNonEquityAmount(2200, 100, 2200)).toEqual({ valid: true });
    });

    describe("method details (combined inputs)", () => {
      describe("ACH", () => {
        const ach = {
          account: "000123456789",
          routing: "110000000",
        };

        it("valid combination", () => {
          expect(validateMethodDetails("ACH", ach)).toEqual({ valid: true });
        });

        it("invalid combination", () => {
          expect(
            validateMethodDetails("ACH", { ...ach, account: "12" })
          ).toEqual(invalidState("Invalid ACH credentials."));
          expect(
            validateMethodDetails("ACH", {
              ...ach,
              account: "123456781234567890",
            })
          ).toEqual(invalidState("Invalid ACH credentials."));
          expect(
            validateMethodDetails("ACH", { ...ach, routing: "12345678" })
          ).toEqual(invalidState("Invalid ACH credentials."));
          expect(
            validateMethodDetails("ACH", { ...ach, routing: "1234567890" })
          ).toEqual(invalidState("Invalid ACH credentials."));
        });
      });

      describe("Credit Card", () => {
        const cc = {
          name: "Justin Chiou",
          number: "4242424242424242",
          month: "11",
          year: String(new Date().getFullYear() % 100),
          cvv: "123",
        };

        it("valid combination", () => {
          expect(validateCreditCard(cc)).toEqual({ valid: true });
          expect(validateMethodDetails("CC", cc)).toEqual({ valid: true });
        });

        it("invalid combination", () => {
          expect(validateCreditCard({ ...cc, name: "" })).toEqual({
            valid: false,
            message: "Invalid Credit Card credentials.",
          });
          expect(
            validateCreditCard({ ...cc, number: "424242424242424" })
          ).toEqual({
            valid: false,
            message: "Invalid Credit Card credentials.",
          });
          expect(validateCreditCard({ ...cc, month: "13" })).toEqual({
            valid: false,
            message: "Invalid Credit Card credentials.",
          });
          expect(validateCreditCard({ ...cc, year: "20" })).toEqual({
            valid: false,
            message: "Invalid Credit Card credentials.",
          });
          expect(validateCreditCard({ ...cc, cvv: "12" })).toEqual({
            valid: false,
            message: "Invalid Credit Card credentials.",
          });
        });
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

  describe("Validate form state", () => {
    const formState = {
      amount: { valid: true },
      method: { valid: true },
      methodDetails: { valid: true },
      attestations: { valid: true },
      ssn: { valid: true },
    };

    it("invalid form state", () => {
      expect(
        isFormValid({
          ...formState,
          amount: invalidState(),
        })
      ).toBe(false);
      expect(
        isFormValid({
          ...formState,
          method: invalidState(),
        })
      ).toBe(false);
      expect(
        isFormValid({
          ...formState,
          methodDetails: invalidState(),
        })
      ).toBe(false);
      expect(
        isFormValid({
          ...formState,
          attestations: invalidState(),
        })
      ).toBe(false);
      expect(
        isFormValid({
          ...formState,
          ssn: invalidState(),
        })
      ).toBe(false);
    });

    it("valid form state", () => {
      expect(isFormValid(formState)).toBe(true);
    });
  });

  describe("Form Logic", () => {
    const user = {
      annualIncome: 0,
      netWorth: 0,
      isEntity: false,
      country: "USA",
    };

    const offering = {
      securityType: "Equity",
      pricePerShare: 100,
      minShares: 1,
      ssnRequired: false,
    };

    const investment = {
      amount: 1,
      method: "CHECK",
      methodDetails: null,
      attestations: ["asdf", "asdf", "asdf", "asdf", "asdf"],
      ssn: "856-88-4512",
    };

    const formState = {
      amount: { valid: true },
      method: { valid: true },
      methodDetails: { valid: true },
      attestations: { valid: true },
      ssn: { valid: true },
    };

    it("valid investment form (checking SSN requirements)", () => {
      expect(
        investmentForm(user, { ...offering, ssnRequired: true }, investment)
      ).toEqual(formState);
    });

    test("valid ssn validation when the investor is non-US", () => {
      expect(
        investmentForm(
          {
            ...user,
            country: "CAN",
          },
          {
            ...offering,
            ssnRequired: true,
          },
          investment
        )
      );
    });

    it("invalid investment form (checking SSN requirements)", () => {
      expect(
        investmentForm(
          user,
          { ...offering, ssnRequired: true },
          { ...investment, ssn: "000-00-0000" }
        )
      ).toEqual({
        ...formState,
        ssn: invalidState("Invalid SSN."),
      });
    });

    it("valid investment form (non-entity)", () => {
      const form = investmentForm(user, offering, investment);
      expect(form).toEqual(formState);
    });

    it("valid investment form (accredited)", () => {
      const accreditedUser = {
        annualIncome: 1000000,
        netWorth: 6000000,
        isEntity: false,
      };
      const form = investmentForm(accreditedUser, offering, investment);
      expect(form).toEqual(formState);
    });

    it("valid investment form (mega-rich person)", () => {
      const accreditedUser2 = {
        annualIncome: 10000000,
        netWorth: 60000000,
        isEntity: false,
      };
      const form2 = investmentForm(accreditedUser2, offering, investment);
      expect(form2).toEqual(formState);
    });

    it("valid investment form (entity-based)", () => {
      const form = investmentForm({ ...user, isEntity: true }, offering, {
        ...investment,
        attestations: ["asdf", "asdf", "asdf", "asdf", "asdf"],
      });
      expect(form).toEqual(formState);
    });

    it("invalid number of attestations (entity-based)", () => {
      const form = investmentForm({ ...user, isEntity: true }, offering, {
        ...investment,
        attestations: ["asdf"],
      });
      expect(form).toEqual({
        ...formState,
        attestations: {
          valid: false,
          message: "You must agree to all attestations before investing.",
        },
      });
    });

    it("invalid investment amount (equity-based)", () => {
      const form = investmentForm(
        user,
        {
          ...offering,
          minShares: 10,
        },
        investment
      );
      expect(form).toEqual({
        ...formState,
        amount: {
          valid: false,
          message: "Must be at least 10 shares.",
        },
      });
    });

    it("invalid Payment Method", () => {
      const form = investmentForm(user, offering, {
        ...investment,
        method: "asdf",
      });
      expect(form).toEqual({
        ...formState,
        method: {
          valid: false,
          message: "Not one of the choices.",
        },
        methodDetails: {
          valid: false,
          message: "Invalid payment method.",
        },
      });
    });

    it("invalid ACH credentials", () => {
      const form = investmentForm(user, offering, {
        ...investment,
        method: "ACH",
      });
      expect(form).toEqual({
        ...formState,
        methodDetails: invalidState(),
      });
    });

    it("valid investment form (non-equity-based)", () => {
      const form = investmentForm(
        user,
        {
          securityType: "SAFE Note", // or SAFT Note or Promissory Note or etc.
          minimumInvestmentAmount: 100,
        },
        {
          ...investment,
          amount: 100,
        }
      );
      expect(form).toEqual(formState);
    });

    it("invalid investment form (non-equity-based)", () => {
      const form = investmentForm(
        user,
        {
          securityType: "SAFE Note", // or SAFT Note or Promissory Note or etc.
          minimumInvestmentAmount: 100,
        },
        {
          ...investment,
          amount: 99,
        }
      );
      expect(form).toEqual({
        ...formState,
        amount: {
          valid: false,
          message: "Must be at least $100 minimum.",
        },
      });
    });

    it("invalid form if amount is >$5k using a credit card.", () => {
      const form = investmentForm(user, offering, {
        ...investment,
        amount: 51,
        method: "CC",
        methodDetails: {
          name: "Justin Chiou",
          number: "4242424242424242",
          month: "12",
          year: String(new Date().getFullYear() % 100),
          cvv: "123",
        },
      });
      expect(form).toEqual({
        ...formState,
        amount: {
          valid: false,
          message:
            "Cannot invest any amount over $5,000.00 using a credit card.",
        },
      });
    });

    it("valid form if not from USA", () => {
      expect(
        investmentForm(
          { ...user, country: "UKR", isEntity: false },
          offering,
          investment
        )
      ).toEqual(formState);

      expect(
        investmentForm(
          { ...user, ssn: "", country: "UKR", isEntity: true },
          offering,
          investment
        )
      ).toEqual(formState);

      expect(
        investmentForm(
          { ...user, ssn: "", country: "UKR", isEntity: false },
          offering,
          investment
        )
      ).toEqual(formState);

      expect(
        investmentForm({ ...user, country: "UKR" }, offering, investment)
      ).toEqual(formState);
    });

    it("valid form if Entity", () => {
      expect(
        investmentForm({ ...user, isEntity: true }, offering, investment)
      ).toEqual(formState);

      expect(
        investmentForm(
          { ...user, country: "UKR", isEntity: true },
          offering,
          investment
        )
      ).toEqual(formState);

      expect(
        investmentForm(
          { ...user, ssn: "000-00-0000", isEntity: true },
          offering,
          investment
        )
      ).toEqual(formState);
    });
  });

  describe("Validate relationship of user/offering to amount invested", () => {
    const user = {
      annualIncome: 0,
      netWorth: 0,
    };

    const offering = {
      investment_minimum: 1,
      pps: 100,
    };

    it("can invest", () => {
      expect(canInvest(user, offering)).toEqual(true);
    });
    it("cannot invest", () => {
      expect(
        canInvest(user, {
          ...offering,
          investment_minimum: 23,
        })
      ).toEqual(false);
    });
  });

  describe("Validate SSN from input", () => {
    it("valid when user is Individual and country is USA", () => {
      expect(validateSSN("856-45-6789").valid).toBeTruthy();
      expect(validateSSN("856-45-6789", "USA").valid).toBeTruthy();
      expect(validateSSN("856-45-6789", "USA", false).valid).toBeTruthy();
    });

    it("valid when user is Individual and country is not USA", () => {
      expect(validateSSN("856-45-6789", "UKR", false).valid).toBeTruthy();
    });

    it("valid when user is Entity, regardless of country", () => {
      expect(validateSSN("856-45-6789", "AAA", true).valid).toBeTruthy();
      expect(validateSSN("856-45-6789", "000", true).valid).toBeTruthy();
      expect(validateSSN("856-45-6789", "***", true).valid).toBeTruthy();
    });

    it("valid when user is Entity and country is USA", () => {
      expect(validateSSN("856-45-6789", "USA", true).valid).toBeTruthy();
      expect(validateSSN("000-00-0000", "USA", true).valid).toBeTruthy();
    });

    it("valid when user is Entity and country is not USA", () => {
      expect(validateSSN("856-45-6789", "AAA", true).valid).toBeTruthy();
      expect(validateSSN("000-00-0000", "AAA", true).valid).toBeTruthy();
    });

    it("invalid when user is Individual and country is USA", () => {
      expect(validateSSN(null).valid).toBeFalsy();
      expect(validateSSN(undefined).valid).toBeFalsy();
      expect(validateSSN("000-00-0000").valid).toBeFalsy();
      expect(validateSSN("000-00-0000", "USA", false).valid).toBeFalsy();
      expect(validateSSN("666-66-6666").valid).toBeFalsy();
      expect(validateSSN("666-66-6666", "USA", false).valid).toBeFalsy();
    });
  });
});
