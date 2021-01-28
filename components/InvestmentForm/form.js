import { paymentMethods } from "./choices";

export const validationError = (message) => ({ valid: false, message });
export const success = { valid: true };

export function required(value) {
  return !value ? validationError("Required.") : success;
}

export function minimum(shares, minShares) {
  return shares < minShares
    ? validationError(`Must be at least ${minShares} shares.`)
    : success;
}

export function minimumNonEquity(amount, minAmount) {
  return amount < minAmount
    ? validationError(`Must be at least $${minAmount} minimum.`)
    : success;
}

export function canSpend(toSpend, spendCapacity) {
  return spendCapacity - toSpend < 0
    ? validationError("Cannot invest more than allowed.")
    : success;
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
    return {
      valid: false,
      message: "Cannot invest any amount over $5,000.00 using a credit card.",
    };
  }

  const result2 = minimum(shares, minShares);
  if (!result2.valid) {
    return result2;
  }

  return canSpend(shares * pricePerShare, spendCapacity);
}

export function validateNonEquityAmount(
  amount,
  minAmount,
  spendCapacity,
  method
) {
  if (!amount) {
    return { valid: false };
  }

  if (amount > 5000 && method === "CC") {
    return {
      valid: false,
      message: "Cannot invest any amount over $5,000.00 using a credit card.",
    };
  }

  const result = required(amount);
  if (!result.valid) {
    return result;
  }

  const result2 = minimumNonEquity(amount, minAmount);
  if (!result2.valid) {
    return result2;
  }

  return canSpend(amount, spendCapacity);
}

export function validateMethodDetails(method, methodDetails) {
  if (["CHECK", "WIRE"].includes(method)) {
    return { valid: true };
  } else if (method === "ACH") {
    return validateACH(methodDetails);
  } else if (method === "CC") {
    return validateCreditCard(methodDetails);
  } else {
    return { valid: false, message: "Invalid payment method." };
  }
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
  return validAmount && validMethod && validMethodDetails && validAttestations;
}

export function investmentForm(user, offering, form) {
  const { annualIncome, netWorth } = user;
  const { securityType } = offering;
  const { amount, method, methodDetails, attestations } = form;
  const spendPool = calculateSpendPool(annualIncome, netWorth);

  if (securityType === "Equity") {
    return {
      amount: validateEquityAmount(
        amount,
        offering.minShares,
        offering.pricePerShare,
        spendPool,
        method
      ),
      method: amongst(method),
      methodDetails: validateMethodDetails(method, methodDetails),
      attestations: allAgreed(attestations),
    };
  } else {
    return {
      amount: validateNonEquityAmount(
        amount,
        offering.minimumInvestmentAmount,
        spendPool,
        method
      ),
      method: amongst(method),
      methodDetails: validateMethodDetails(method, methodDetails),
      attestations: allAgreed(attestations),
    };
  }
}

export function amongst(method) {
  const values = paymentMethods.map((el) => el.value);
  return values.includes(method)
    ? success
    : validationError("Not one of the choices.");
}

export function allAgreed(attestations = []) {
  if (
    attestations.some((el) => [null, undefined].includes(el)) ||
    !attestations.every((el) => el.length > 0) ||
    attestations.length !== 5
  ) {
    return validationError(
      "You must agree to all attestations before investing."
    );
  }

  return success;
}

export function validateAchAccount(account) {
  if (!account) return { valid: false };

  if (account.length < 3 || account.length > 17) {
    return validationError("Invalid account number.");
  }

  return success;
}

export function validateAchRouting(routing) {
  if (!routing) return { valid: false };

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
    return validationError("Invalid routing number.");
  }

  return success;
}

export function validateCardName(name) {
  if (!name) return { valid: false };
  if (!required(name).valid) return required(name);

  const regex = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/g;

  if (name.length <= 1 || !regex.test(name)) {
    return validationError("Invalid cardholder name.");
  }

  return success;
}

export function validateExpiryMonth(month) {
  if (!month) {
    return { valid: false };
  }

  if (!required(month).valid) {
    return required(month);
  }

  if (typeof month !== "string") {
    return validationError("Must be of type String.");
  }

  if (Number(month) < 1 || Number(month) > 12) {
    return validationError("Must be between 01 and 12.");
  }

  return success;
}

export function validateExpiryYear(year) {
  if (!year) {
    return { valid: false };
  }

  if (typeof year !== "string") {
    return validationError("Must be of type String.");
  }

  const thisYear = new Date().getFullYear();

  if (2000 + Number(year) < thisYear) {
    return validationError("Invalid expiry year.");
  }

  return success;
}

export function validateExpiry(month, year) {
  if (!validateExpiryMonth(month).valid) return validateExpiryMonth(month);
  if (!validateExpiryYear(year).valid) return validateExpiryYear(year);

  const today = new Date();
  const expiry = new Date(`${2000 + Number(year)}-${month}`);
  if (today > expiry) {
    return { valid: false, message: "Card expired." };
  }
  return { valid: true };
}

export function validateCVV(number) {
  if (!number) {
    return { valid: false };
  }

  const regex = /^[0-9]{3}$/;

  if (regex.test(number)) {
    return success;
  }

  return validationError("Invalid CVV number.");
}

export function validateCardNumber(number) {
  const error = validationError(
    "Invalid cardholder number. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
  );

  const amexError = validationError(
    "We do not accept American Express. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
  );

  const viRegex = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const mcRegex = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const diRegex = /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const aeRegex = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;

  if (!number) return { valid: false };

  if (aeRegex.test(number)) return amexError;
  else if (viRegex.test(number)) return success;
  else if (mcRegex.test(number)) return success;
  else if (diRegex.test(number)) return success;
  return error;
}

export function validateACH(methodDetails) {
  if (!methodDetails || !methodDetails.account || !methodDetails.routing) {
    return { valid: false };
  }
  const { account, routing } = methodDetails;
  const validAccountNumber = validateAchAccount(account);
  const validRoutingNumber = validateAchRouting(routing);
  if (!validAccountNumber.valid || !validRoutingNumber.valid) {
    return { valid: false, message: "Invalid ACH credentials." };
  }
  return { valid: true };
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
    return { valid: false, message: "Invalid Credit Card credentials." };
  }

  return { valid: true };
}

export function canInvest(user, offering) {
  const spendPool = calculateSpendPool(user.annualIncome, user.netWorth);
  const min = offering.investment_minimum * offering.pps;
  return spendPool >= min;
}
