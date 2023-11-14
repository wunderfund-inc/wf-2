import { AMEX_REGEX, determineCard } from "./card";
import { countries, entityTypes, paymentMethods, states } from "./choices";

export function required(val) {
  return { valid: !!val };
  // if (!val) return { valid: false };
  // return { valid: true };
}

export function alpha(val) {
  const regex = /^[a-zA-Z '-.]{2,}$/;
  if (regex.test(String(val))) return { valid: true };
  return { valid: false, message: "Must be greater than 1 letter." };
}

export function numeric(val) {
  const regex = /^[0-9]{2,}$/;
  if (!regex.test(String(val))) {
    return { valid: false, message: "Must be numbers only." };
  }
  return { valid: true };
}

export function isPhoneNumber(val) {
  const regex = /^[0-9-]{8,}$/;
  if (!regex.test(String(val))) {
    return { valid: false, message: "Must only include digits." };
  }
  return { valid: true };
}

export function isEIN(val) {
  const campus = {
    andover: ["10", "12"],
    atlanta: ["60", "67"],
    austin: ["50", "53"],
    brookhaven: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "11",
      "13",
      "14",
      "16",
      "21",
      "22",
      "23",
      "25",
      "34",
      "51",
      "52",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "65",
    ],
    cincinnati: ["30", "32", "35", "36", "37", "38", "61"],
    fresno: ["15", "24"],
    internet: [
      "20",
      "26",
      "27",
      "45",
      "46",
      "47",
      "81",
      "82",
      "83",
      "84",
      "85",
    ],
    kansas: ["40", "44"],
    memphis: ["94", "95"],
    ogden: ["80", "90"],
    philadelphia: [
      "33",
      "39",
      "41",
      "42",
      "43",
      "46",
      "48",
      "62",
      "63",
      "64",
      "66",
      "68",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "86",
      "87",
      "88",
      "91",
      "92",
      "93",
      "98",
      "99",
    ],
    sba: ["31"],
  };

  const prefixes = [];

  for (const location in campus) {
    prefixes.push(...campus[location]);
  }

  prefixes.sort();

  const regex = /^\d{2}[- ]{0,1}\d{7}$/;

  if (regex.test(val) && prefixes.includes(val.substr(0, 2))) {
    return { valid: true };
  }
  return { valid: false, message: "Invalid EIN." };
}

export function alphanumeric(val) {
  const regex = /^[a-zA-Z0-9 '-.]{1,}$/;
  if (regex.test(String(val))) return { valid: true };
  return { valid: false, message: "Invalid input." };
}

export function overEighteen(birthdate) {
  const ageDifMs = Date.now() - new Date(birthdate).getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
    return { valid: false, message: "Must be at least 18 years of age." };
  }
  return { valid: true };
}

function validateFirstName(firstName) {
  if (!firstName) return { valid: false };
  return alpha(firstName);
}

function validateLastName(lastName) {
  if (!lastName) return { valid: false };
  return alpha(lastName);
}

function validateDob(dob) {
  if (!dob) return { valid: false };
  return overEighteen(dob);
}

function validatePhone(phone) {
  if (!phone) return { valid: false };
  return isPhoneNumber(phone);
}

function validateStreet1(street1) {
  if (!street1) return { valid: false };
  return alphanumeric(street1);
}

function validateStreet2(street2) {
  if (!street2) return { valid: true };
  return alphanumeric(street2);
}

function validateCity(city) {
  if (!city) return { valid: false };
  return alpha(city);
}

function validateState(state, country) {
  if (!state) return { valid: false };

  const stateCodes = states.map((state) => state.abbreviation);

  if (stateCodes.includes(state)) {
    if (
      (state === "NOUS" && country === "USA") ||
      (state !== "NOUS" && country !== "USA")
    ) {
      return { valid: false, message: "Invalid state/country pairing." };
    } else {
      return { valid: true };
    }
  }

  return { valid: false, message: "Invalid state selection." };
}

function validateCountry(state, country) {
  if (!country) return { valid: false };

  const countryCodes = countries.map((country) => country.code);

  if (countryCodes.includes(country)) {
    if (
      (state === "NOUS" && country === "USA") ||
      (state !== "NOUS" && country !== "USA")
    ) {
      return { valid: false, message: "Invalid state/country pairing." };
    } else {
      return { valid: true };
    }
  }

  return { valid: false, message: "Invalid country selection." };
}

export function validatePostal(postal, country = "USA") {
  if (!postal) return { valid: false };
  const regex = /^\d{5}$/;
  if (country === "USA" && !regex.test(postal)) {
    return { valid: false, message: "Just the 5 digits will do." };
  }
  return alphanumeric(postal);
}

function validateEntityName(name) {
  return !name ? { valid: false } : alphanumeric(name);
}

function validateEntityType(entityType) {
  if (!entityType) return { valid: false };
  if (entityTypes.includes(entityType)) return { valid: true };
  return { valid: false, message: "Invalid Entity type." };
}

function validateEIN(ein) {
  return !ein ? { valid: false } : isEIN(ein);
}

export function profileFormState(form, isEntity = false) {
  const dto = {
    firstName: validateFirstName(form.firstName),
    lastName: validateLastName(form.lastName),
    phone: validatePhone(form.phone),
    street1: validateStreet1(form.street1),
    street2: validateStreet2(form.street2),
    city: validateCity(form.city),
    state: validateState(form.state, form.country),
    country: validateCountry(form.state, form.country),
    postal: validatePostal(form.postal, form.country),
  };

  if (isEntity) {
    dto.entityName = validateEntityName(form.entityName);
    dto.entityType = validateEntityType(form.entityType);
    dto.ein = validateEIN(form.ein);
  } else {
    dto.dob = validateDob(form.dob);
  }

  return dto;
}

export function isProfileFormValid(formState, isEntity = false) {
  const baseValidity =
    formState.firstName.valid &&
    formState.lastName.valid &&
    formState.phone.valid &&
    formState.street1.valid &&
    formState.street2.valid &&
    formState.city.valid &&
    formState.state.valid &&
    formState.country.valid &&
    formState.postal.valid;

  const otherValidity = isEntity
    ? formState.entityName.valid &&
      formState.entityType.valid &&
      formState.ein.valid
    : formState.dob.valid;

  return baseValidity && otherValidity;
}

export const validState = { valid: true };
export const invalidState = (message = "") => {
  const state = { valid: false };
  if (message) state.message = message;
  return state;
};

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
  if (!/^[0-9]{3}$/.test(number)) return invalidState("Invalid CVV number.");
  return validState;
}

export function validateCardNumber(number) {
  if (!number) return invalidState();

  const amexError = invalidState(
    "We do not accept American Express. Please use a number from one of the following companies: VISA, MASTERCARD, DISCOVER."
  );

  if (AMEX_REGEX.test(number)) return amexError;
  if (["VI", "MC", "DI"].includes(determineCard(number))) return validState;

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
