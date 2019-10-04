import Vue from "vue";

/**
 * Capitalize all letters of a string
 */
const capitalize = val => val.toUpperCase();
Vue.filter("capitalize", capitalize);

/**
 * Proper case a string (capitalize the first letter only)
 */
const properCase = val => {
  if (val === "iot") {
    return "IoT";
  } else {
    return val.charAt(0).toUpperCase() + val.substr(1);
  }
};
Vue.filter("properCase", properCase);

/**
 * Return a string, displayed in USD currency, from a raw number
 */
const asCurrency = val => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(val);
};
Vue.filter("asCurrency", asCurrency);

/**
 * Add percentage to raw number
 */
const asPercentage = val => `${val}%`;
Vue.filter("asPercentage", asPercentage);

/**
 * Add "Reg" to regulation type - if it's A, it's actually "A+"
 */
const regulationFormat = val => {
  if (val === "A") {
    return "Reg A+";
  } else {
    return `Reg ${val}`;
  }
};
Vue.filter("regulationFormat", regulationFormat);
