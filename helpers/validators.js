// import differenceInDays from "date-fns/differenceInDays";
import differenceInYears from "date-fns/differenceInYears";
import { validCard } from "./card";

export const validPostal = (val) => {
  // if (val === null) return null;
  const reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return val === null ? val : reg.test(val);
};

export const validEmail = (email) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

export const accredited = (ai = 0, nw = 0) => {
  return ai >= 200000 && nw >= 1000000;
};

// TODO
export const isBetween = (n = 0, a = 0, b = 0) => (n - a) * (n - b) <= 0;

export const validAchAccountNumber = (number) => {
  if (!number) return false;
  return isBetween(number.length, 4, 17);
};

export const validAchRoutingNumber = (number) => {
  if (!number) return false;
  const regex =
    /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/;
  return regex.test(number);
};

const validName = (name) => {
  if (!name) return false;
  return name.length >= 3;
};

export const validNumber = (number) => {
  return validCard(number);
};

export const validMonth = (month = null) => {
  if (!month) return false;
  return month.length === 2 && isBetween(Number(month), 1, 12);
};

export const validYear = (year = null) => {
  if (!year) return false;
  return year.length === 2 && Number(year) >= 21;
};

export const validCVV = (cvv = null) => {
  if (!cvv) return false;
  const regex = /^\d{3}$/;
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
  const difference = differenceInYears(
    new Date(),
    new Date(Number(seconds) * 1000)
  );
  return difference >= 1;
}
