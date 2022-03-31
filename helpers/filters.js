import Vue from "vue";
import numeral from "numeral";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";

/**
 * Capitalize all letters of a string
 */
export const capitalize = (val) => val.toUpperCase();
Vue.filter("capitalize", capitalize);

/**
 * Proper case a string (capitalize the first letter only)
 */
export const properCase = (val) => {
  if (val === "iot") return "IoT";
  return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
};
Vue.filter("properCase", properCase);

/**
 * Return a string, displayed in USD currency, from a raw number
 */
export const asCurrency = (val) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};
Vue.filter("asCurrency", asCurrency);

/**
 * Add percentage to raw number
 */
export const asPercentage = (val) => `${val}%`;
Vue.filter("asPercentage", asPercentage);

/**
 * Add "Reg" to regulation type - if it's A, it's actually "A+"
 */
export const regulationFormat = (val) => (val === "A" ? "A+" : val);
Vue.filter("regulationFormat", regulationFormat);

/**
 * Pluralize words on the FAQ menus, depending on the word
 */
export const pluralFaq = (val) => {
  switch (val) {
    case "investor":
      return `${val}s`;
    case "company":
      return "companies";
    default:
      return val;
  }
};
Vue.filter("pluralFaq", pluralFaq);

/**
 * Payment method string formatting
 * @example "ACH" => "Bank Account (ACH)"
 * @param {string} val
 * @returns string
 */
export const paymentMethodFormat = (val) => {
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
export const einNumToStr = (val) => {
  const word = String(val).split("");
  return word.slice(0, 2).join("") + "-" + word.slice(2).join("");
};
Vue.filter("einStrFormat", einNumToStr);

/**
 * Helper function to convert to local timezone.
 */
const toEasternTimezone = (d = null) => {
  if (d) {
    const dString = new Date(d).toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    return new Date(dString);
  }
  return new Date(new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  }));
}

/**
 * Function to calculate days left
 */
export const timeDistance = (val) => {
  const d = toEasternTimezone();
  const d2 = toEasternTimezone(val);
  return formatDistance(d, d2);
};
Vue.filter("timeDistance", timeDistance);

/**
 * Format currency to its abbreviated form
 * @example 10000 => "$10.0K"
 * @param {int} val
 * @returns string
 */
export const currencyDisplayFormat = (val) => {
  if (isNaN(val)) throw new TypeError("not a number");
  return numeral(val).format("$(0.0a)").toUpperCase();
};
Vue.filter("currencyDisplayFormat", currencyDisplayFormat);

/**
 * Format number to a shorthand version.
 * @example 1000000 => "1.0M"
 * @param {int} val
 * @returns string
 */
export const properIntegerFormat = (val) => {
  if (isNaN(val)) throw new TypeError("not a number");
  return numeral(val).format("(0.0a)").toUpperCase();
};
Vue.filter("properIntegerFormat", properIntegerFormat);

/**
 * Given an array of money amounts, reduce array and sum total to return to the
 * raw amount total that's been raised
 * @param {array[object]}
 */
export const reduceToTotal = (items) => {
  const listOfAmounts = items.map((item) => item.amount);
  return listOfAmounts.reduce((tot, num) => tot + num, 0);
};
Vue.filter("reduceToTotal", reduceToTotal);

/**
 * Return first letter of a string.
 * @example "Justin" => "J"
 * @param {string} val
 * @returns string
 */
export const firstLetterOnly = (val) => (!val ? "" : val.charAt(0));
Vue.filter("firstLetterOnly", firstLetterOnly);

/**
 * Returns a string representing a long form date (e.g. "May 01, 2020")
 * @param {Date} date
 * @returns string
 */
export const dateFormatLong = (date) => format(date, "PP");
Vue.filter("dateFormatLong", dateFormatLong);
