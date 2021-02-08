import { states, countries } from "./choices";

export function required(val) {
  if (!val) return { valid: false };
  return { valid: true };
}

export function alpha(val) {
  const regex = /^[a-zA-Z '-]{2,}$/;
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

export function alphanumeric(val) {
  const regex = /^[a-zA-Z0-9 '-]{1,}$/;
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

function validatePostal(postal) {
  if (!postal) return { valid: false };
  return alphanumeric(postal);
}

export function profileFormState(form) {
  return {
    firstName: validateFirstName(form.firstName),
    lastName: validateLastName(form.lastName),
    dob: validateDob(form.dob),
    phone: validatePhone(form.phone),
    street1: validateStreet1(form.street1),
    street2: validateStreet2(form.street2),
    city: validateCity(form.city),
    state: validateState(form.state, form.country),
    country: validateCountry(form.state, form.country),
    postal: validatePostal(form.postal),
  };
}

export function isProfileFormValid(formState) {
  return (
    formState.firstName.valid &&
    formState.lastName.valid &&
    formState.dob.valid &&
    formState.phone.valid &&
    formState.street1.valid &&
    formState.street2.valid &&
    formState.city.valid &&
    formState.state.valid &&
    formState.country.valid &&
    formState.postal.valid
  );
}
