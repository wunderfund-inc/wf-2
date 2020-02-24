import Vue from "vue";
import formatDistance from "date-fns/formatDistance";
import numeral from "numeral";

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
      return "a Check";
    case "WIRE":
      return "a Wire Transfer";
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
  return formatDistance(new Date(val), new Date());
};
Vue.filter("timeDistance", timeDistance);

/**
 * Format currency to its abbreviated form
 */
export const currencyDisplayFormat = val => numeral(val).format("($0.0a)");
Vue.filter("currencyDisplayFormat", currencyDisplayFormat);

/**
 * Reduce array of investments to raw amount total that's been raised
 */
export const amountRaised = investments => {
  const listOfAmounts = investments.map(investment => investment.amount);
  return listOfAmounts.reduce((tot, num) => tot + num, 0);
};
Vue.filter("amountRaised", amountRaised);

export const firstLetterOnly = val => {
  return val.charAt(0);
};
Vue.filter("firstLetterOnly", firstLetterOnly);
