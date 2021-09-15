import { paymentMethods } from "./choices";

export const validState = { valid: true };
export const invalidState = (message = "") => {
  const state = { valid: false };
  if (message) state.message = message;
  return state;
};

export function required(value) {
  return !value ? invalidState("Required.") : validState;
}

export function minimum(shares, minShares) {
  return shares < minShares
    ? invalidState(`Must be at least ${minShares} shares.`)
    : validState;
}

export function minimumNonEquity(amount, minAmount) {
  return amount < minAmount
    ? invalidState(`Must be at least $${minAmount} minimum.`)
    : validState;
}

export function canSpend(toSpend, spendCapacity) {
  return spendCapacity - toSpend < 0
    ? invalidState("Cannot invest more than allowed.")
    : validState;
}

export function validateEquityAmount(
  shares,
  minShares,
  pricePerShare,
  spendCapacity,
  method
) {
  const result = required(shares);

  if (!result.valid) {
    return result;
  }

  if (shares * pricePerShare > 5000 && method === "CC") {
    const m = "Cannot invest any amount over $5,000.00 using a credit card.";
    return invalidState(m);
  }

  const result2 = minimum(shares, minShares);
  if (!result2.valid) return result2;

  return canSpend(shares * pricePerShare, spendCapacity);
}

export function validateNonEquityAmount(
  amount,
  minAmount,
  spendCapacity,
  method
) {
  if (!amount) return invalidState();

  if (amount > 5000 && method === "CC") {
    const m = "Cannot invest any amount over $5,000.00 using a credit card.";
    return invalidState(m);
  }

  const checkEquityAmount = minimumNonEquity(amount, minAmount);
  if (!checkEquityAmount.valid) return checkEquityAmount;

  return canSpend(amount, spendCapacity);
}

export function validateMethodDetails(method, methodDetails) {
  const methods = ["CHECK", "WIRE", "ACH", "CC"];

  if (!methods.includes(method)) {
    return invalidState("Invalid payment method.");
  }

  if (method === "ACH") {
    return validateACH(methodDetails);
  }

  if (method === "CC") {
    return validateCreditCard(methodDetails);
  }

  return validState;
}

function calculateSpendPool(ai, nw) {
  const choice = Math.min(ai, nw);
  const min = 2200;
  const max = 107000;

  if (choice < max) {
    return Math.max(min, choice * 0.05);
  } else {
    return choice * 0.1 >= max ? max : choice * 0.1;
  }
}

export function isFormValid(form) {
  const validAmount = form.amount.valid;
  const validMethod = form.method.valid;
  const validMethodDetails = form.methodDetails.valid;
  const validAttestations = form.attestations.valid;
  const validSSN = form.ssn.valid;
  return (
    validAmount &&
    validMethod &&
    validMethodDetails &&
    validAttestations &&
    validSSN
  );
}

export function investmentForm(user, offering, form) {
  const { annualIncome, netWorth, country, isEntity } = user;
  const { securityType, ssnRequired } = offering;
  const { amount, method, methodDetails, attestations, ssn } = form;
  const spendPool = calculateSpendPool(annualIncome, netWorth);

  return {
    amount:
      securityType === "Equity"
        ? validateEquityAmount(
            amount,
            offering.minShares,
            offering.pricePerShare,
            spendPool,
            method
          )
        : validateNonEquityAmount(
            amount,
            offering.minimumInvestmentAmount,
            spendPool,
            method
          ),
    method: amongst(method),
    methodDetails: validateMethodDetails(method, methodDetails),
    attestations: allAgreed(attestations),
    ssn:
      ssnRequired && country === "USA"
        ? validateSSN(ssn, country, isEntity)
        : validState,
  };
}

export function amongst(method) {
  const values = paymentMethods.map((el) => el.value);

  if (!values.includes(method)) {
    return invalidState("Not one of the choices.");
  }

  return validState;
}

export function allAgreed(attestations = []) {
  if (
    attestations.some((el) => [null, undefined].includes(el)) ||
    !attestations.every((el) => el.length > 0) ||
    attestations.length !== 5
  ) {
    const m = "You must agree to all attestations before investing.";
    return invalidState(m);
  }

  return validState;
}

export function validateAchAccount(account) {
  if (!account) return invalidState();

  if (account.length < 3 || account.length > 17) {
    return invalidState("Invalid account number.");
  }

  return validState;
}

export function validateAchRouting(routing) {
  if (!routing) return invalidState();

  const checksumTotal =
    7 *
      (parseInt(routing.charAt(0), 10) +
        parseInt(routing.charAt(3), 10) +
        parseInt(routing.charAt(6), 10)) +
    3 *
      (parseInt(routing.charAt(1), 10) +
        parseInt(routing.charAt(4), 10) +
        parseInt(routing.charAt(7), 10)) +
    9 *
      (parseInt(routing.charAt(2), 10) +
        parseInt(routing.charAt(5), 10) +
        parseInt(routing.charAt(8), 10));

  const checksumMod = checksumTotal % 10;

  if (checksumMod !== 0 || routing.length !== 9) {
    return invalidState("Invalid routing number.");
  }

  return validState;
}

export function validateCardName(name) {
  if (!name) return invalidState();

  const regex = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/g;

  if (name.length <= 1 || !regex.test(name)) {
    return invalidState("Invalid cardholder name.");
  }

  return validState;
}

export function validateExpiryMonth(m) {
  if (!m) return invalidState();

  if (isNaN(Number(m))) {
    return invalidState("Month is not a number.");
  }

  if (Number(m) > 12 || Number(m) < 1) {
    return invalidState("Invalid expiry month.");
  }

  return validState;
}

export function validateExpiryYear(year) {
  if (!year) return invalidState();

  if (new Date().getFullYear() > 2000 + Number(year)) {
    return { valid: false, message: "Invalid expiry year." };
  }

  return validState;
}

export function validateExpiry(month, year) {
  if (!validateExpiryMonth(month).valid) {
    return validateExpiryMonth(month);
  }

  if (!validateExpiryYear(year).valid) {
    return validateExpiryYear(year);
  }

  const now = new Date();
  const today = new Date(`${now.getFullYear()}-${now.getMonth() + 1}`);
  const expiry = new Date(`${2000 + Number(year)}-${month}`);

  if (today > expiry) {
    return invalidState("Card expired.");
  }

  return validState;
}

export function validateCVV(number) {
  if (!number) return invalidState();
  const regex = /^[0-9]{3}$/;
  if (!regex.test(number)) return invalidState("Invalid CVV number.");
  return validState;
}

export function validateCardNumber(number) {
  if (!number) return invalidState();

  const amexError = invalidState(
    "We do not accept American Express. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
  );
  const viRegex = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const mcRegex = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const diRegex = /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const aeRegex = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;

  if (aeRegex.test(number)) return amexError;
  else if (viRegex.test(number)) return validState;
  else if (mcRegex.test(number)) return validState;
  else if (diRegex.test(number)) return validState;

  const m =
    "Invalid cardholder number. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER.";
  return invalidState(m);
}

export function validateACH(methodDetails) {
  if (!methodDetails || !methodDetails.account || !methodDetails.routing) {
    return invalidState();
  }

  const { account, routing } = methodDetails;
  const validAccountNumber = validateAchAccount(account);
  const validRoutingNumber = validateAchRouting(routing);

  if (!validAccountNumber.valid || !validRoutingNumber.valid) {
    return invalidState("Invalid ACH credentials.");
  }

  return validState;
}

export function validateCreditCard(methodDetails) {
  const { name, number, month, year, cvv } = methodDetails;
  const validName = validateCardName(name);
  const validNumber = validateCardNumber(number);
  const validExpiry = validateExpiry(month, year);
  const validCVV = validateCVV(cvv);

  if (
    !validName.valid ||
    !validNumber.valid ||
    !validExpiry.valid ||
    !validCVV.valid
  ) {
    return invalidState("Invalid Credit Card credentials.");
  }

  return validState;
}

export function canInvest(user, offering) {
  const spendPool = calculateSpendPool(user.annualIncome, user.netWorth);
  const min = offering.investment_minimum * offering.pps;
  return spendPool >= min;
}

export function validateSSN(val, country = "USA", isEntity = false) {
  const regex = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
  if (isEntity || country !== "USA" || regex.test(val)) return validState;
  if (!val) return invalidState();
  return invalidState("Invalid SSN.");
}
