import Vue from "vue";

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
    case "CC":
      return "Credit Card";
    case "CRYPTO":
      return "Cryptocurrency (Ethereum)";
    default:
      return properCase(val);
  }
};
Vue.filter("paymentMethodFormat", paymentMethodFormat);
