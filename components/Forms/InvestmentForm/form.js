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

export function canSpend(toSpend, spendCapacity) {
  return spendCapacity - toSpend < 0
    ? validationError("Cannot invest more than allowed.")
    : success;
}

export function validateAmount(
  shares,
  minShares,
  pricePerShare,
  spendCapacity
) {
  const result = required(shares);
  if (!result.valid) {
    return result;
  }

  const result2 = minimum(shares, minShares);
  if (!result2.valid) {
    return result2;
  }

  return canSpend(shares * pricePerShare, spendCapacity);
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
  return 2200;
}

export function isFormValid(form) {
  const validAmount = form.amount.valid;
  const validMethod = form.method.valid;
  const validMethodDetails = form.methodDetails.valid;
  const validAttestations = form.attestations.valid;
  return validAmount && validMethod && validMethodDetails && validAttestations;
}

export function investmentForm(user, offering, form) {
  const { annualIncome, netWorth, isEntity } = user;
  const { pricePerShare, minShares } = offering;
  const { amount, method, methodDetails, attestations } = form;
  const spendPool = calculateSpendPool(annualIncome, netWorth);
  return {
    amount: validateAmount(amount, minShares, pricePerShare, spendPool),
    method: amongst(method),
    methodDetails: validateMethodDetails(method, methodDetails),
    attestations: allAgreed(attestations, isEntity),
  };
}

export function amongst(method) {
  const values = paymentMethods.map((el) => el.value);
  return values.includes(method)
    ? success
    : validationError("Not one of the choices.");
}

export function allAgreed(attestations = [], isEntity = false) {
  const attestationLength = isEntity ? 5 : 4;

  if (
    attestations.some((el) => [null, undefined].includes(el)) ||
    !attestations.every((el) => el.length > 0) ||
    attestations.length !== attestationLength
  ) {
    return validationError(
      "You must agree to all attestations before investing."
    );
  }

  return success;
}

export function validateAchAccount(account) {
  if (account.length < 3 || account.length > 17) {
    return validationError("Invalid account number.");
  }

  return success;
}

export function validateAchRouting(routing) {
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
  if (!required(name).valid) return required(name);

  const regex = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/g;

  if (name.length <= 1 || !regex.test(name)) {
    return validationError("Invalid cardholder name.");
  }

  return success;
}

export function validateExpiryMonth(month) {
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
  if (typeof year !== "string") {
    return validationError("Must be of type String.");
  }

  const thisYear = new Date().getFullYear();

  if (2000 + Number(year) < thisYear) {
    return validationError("Invalid expiry year.");
  }

  return success;
}

export function validateCVV(number) {
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

  if (aeRegex.test(number)) return amexError;
  else if (viRegex.test(number)) return success;
  else if (mcRegex.test(number)) return success;
  else if (diRegex.test(number)) return success;
  return error;
}

export function validateACH(methodDetails) {
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
  const validMonth = validateExpiryMonth(month);
  const validYear = validateExpiryYear(year);
  const validCVV = validateCVV(cvv);

  if (
    !validName.valid ||
    !validNumber.valid ||
    !validMonth.valid ||
    !validYear.valid ||
    !validCVV.valid
  ) {
    return { valid: false, message: "Invalid Credit Card credentials." };
  }
  return { valid: true };
}
