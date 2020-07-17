import Vue from "vue";
import numeral from "numeral";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import fromUnixTime from "date-fns/fromUnixTime";

/**
 * Capitalize all letters of a string
 */
export const capitalize = val => val.toUpperCase();
Vue.filter("capitalize", capitalize);

/**
 * Proper case a string (capitalize the first letter only)
 */
export const properCase = val => {
  if (val === "iot") {
    return "IoT";
  } else {
    return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
  }
};
Vue.filter("properCase", properCase);

/**
 * Return a string, displayed in USD currency, from a raw number
 */
export const asCurrency = val => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(val);
};
Vue.filter("asCurrency", asCurrency);

/**
 * Add percentage to raw number
 */
export const asPercentage = val => `${val}%`;
Vue.filter("asPercentage", asPercentage);

/**
 * Add "Reg" to regulation type - if it's A, it's actually "A+"
 */
export const regulationFormat = val => (val === "A" ? "A+" : val);
Vue.filter("regulationFormat", regulationFormat);

/**
 * Pluralize words on the FAQ menus, depending on the word
 */
export const pluralFaq = val => {
  if (val === "investor") return `${val}s`;
  if (val === "company") return "companies";
  return val;
};
Vue.filter("pluralFaq", pluralFaq);

/**
 * Payment method string formatting
 */
export const paymentMethodFormat = val => {
  switch (val) {
    case "ACH":
      return "Bank Account (ACH)";
    case "CHECK":
      return "Check";
    case "WIRE":
      return "Wire Transfer";
    case "CC":
      return "Credit Card";
    case "CRYPTO":
      return "Cryptocurrency (Ethereum)";
    default:
      return properCase(val);
  }
};
Vue.filter("paymentMethodFormat", paymentMethodFormat);

/**
 * EIN formatter (int to str)
 */
export const einNumToStr = val => {
  const word = String(val).split("");
  return word.slice(0, 2).join("") + "-" + word.slice(2).join("");
};
Vue.filter("einStrFormat", einNumToStr);

/**
 * Function to calculate days left
 */
export const timeDistance = val => {
  return formatDistance(new Date(), new Date(`${val} 23:59:59`));
};
Vue.filter("timeDistance", timeDistance);

/**
 * Format currency to its abbreviated form
 */
export const currencyDisplayFormat = val => {
  if (parseFloat(val.toString()) === parseFloat(val)) {
    return numeral(val)
      .format("($0.0a)")
      .toUpperCase();
  } else {
    throw TypeError("not a number");
  }
};
Vue.filter("currencyDisplayFormat", currencyDisplayFormat);

/**
 * Given an array of money amounts, reduce array and sum total to return to the
 * raw amount total that's been raised
 * @param {array[object]}
 */
export const reduceToTotal = items => {
  const listOfAmounts = items.map(item => item.amount);
  return listOfAmounts.reduce((tot, num) => tot + num, 0);
};
Vue.filter("reduceToTotal", reduceToTotal);

/**
 * Return first letter of a string.
 * @example "Justin" => "J"
 * @param {string} val
 * @returns string
 */
const firstLetterOnly = val => {
  if (val) {
    return val.charAt(0);
  }
  return "";
};
Vue.filter("firstLetterOnly", firstLetterOnly);

/**
 * Converts unix time to locale date string
 * @param {Date} val
 * @returns date string
 */
const dateFromSeconds = val => fromUnixTime(val).toLocaleDateString();
Vue.filter("dateFromSeconds", dateFromSeconds);

/**
 * Converts to Long form date (e.g. "May 01, 2020")
 * @param {Date} val
 * @returns date string
 */
const dateFormatLong = val => format(val, "PP");
Vue.filter("dateFormatLong", dateFormatLong);
