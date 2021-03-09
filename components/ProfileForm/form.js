import { states, countries, entityTypes } from "./choices";

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

function validatePostal(postal, country = "USA") {
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
    postal: validatePostal(form.postal),
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
