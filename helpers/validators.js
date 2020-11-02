import differenceInDays from "date-fns/differenceInDays";

export const validPostal = (val) => {
  if (val === null) return null;
  const reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return val === null ? val : reg.test(val);
};

export const validMethodExtras = (state) => {
  if (state.selectedMethod === "ACH") {
    const validAccountNumber = true;
    const validRoutingNumber = true;

    return validAccountNumber && validRoutingNumber;
  } else if (state.selectedMethod === "CC") {
    const regexCVV = /^[0-9]{3,4}$/;
    const validCVV = regexCVV.test(state.cc.cvv);
    const validMonth =
      Number(state.cc.expiry.month) > 0 && Number(state.cc.expiry.month) < 13;
    const validYear = state.cc.expiry.year === 20;

    return validMonth && validYear && validCVV;
  } else if (state.selectedMethod === "CRYPTO") {
    const validEthereumAddress = true;

    return validEthereumAddress;
  }
  return false;
};

export const validEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

export const accredited = (ai = 0, nw = 0) => {
  return ai >= 200000 && nw >= 1000000;
};

// TODO
const isBetween = (n = 0, a = 0, b = 0) => (n - a) * (n - b) <= 0;

export const validAchAccountNumber = (number) => {
  if (!number) return false;
  return isBetween(number.length, 4, 17);
};

export const validAchRoutingNumber = (number) => {
  if (!number) return false;
  const regex = /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/;
  return regex.test(number);
};

const validName = (name) => {
  if (!name) return false;
  return name.length >= 3;
};

const validNumber = (number) => {
  const viRegex = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const mcRegex = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
  const diRegex = /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;
  // const aeRegex = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;

  if (viRegex.test(number)) return true;
  else if (mcRegex.test(number)) return true;
  else if (diRegex.test(number)) return true;
  return false;
};

const validMonth = (month) => {
  if (!month) return false;
  return month.length === 2 && isBetween(Number(month), 1, 12);
};

const validYear = (year) => {
  if (!year) return false;
  return year.length === 2 && Number(year) >= 20;
};

const validCVV = (cvv) => {
  if (!cvv) return false;
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};

export const validCreditCard = ({ name, number, month, year, cvv }) => {
  return (
    validName(name) &&
    validNumber(number) &&
    validMonth(month) &&
    validYear(year) &&
    validCVV(cvv)
  );
};

export const validEthereumAddress = (address) => {
  if (!address) return false;
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

export const validAttestations = (listOfAttestations = []) => {
  if (!listOfAttestations) return false;

  if (listOfAttestations.length > 0) {
    return (
      !listOfAttestations.includes(false) && !listOfAttestations.includes(null)
    );
  }

  return false;
};

/**
 * Check if within 30 days of closing a campaign
 * @param {string} endDate formatted "YYYY-MM-DD"
 */
export const endingSoon = (endDate) => {
  const thirtyDays = 2592000000; // in milliseconds
  return new Date(`${endDate} 23:59:59`) - new Date() <= thirtyDays;
};

/**
 * Check if past closing date
 * @param {string} endDate formatted "YYYY-MM-DD"
 */
export const endedAlready = (endDate) => {
  return new Date(`${endDate} 23:59:59`) - new Date() <= 0;
};

/**
 * Check if one year passed since an investment was made.
 * @param {int} seconds # of seconds since Epoch
 * @returns boolean
 */
export function oneYearPassed(seconds) {
  return differenceInDays(new Date(), new Date(Number(seconds) * 1000)) >= 365;
}
