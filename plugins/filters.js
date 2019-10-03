import Vue from "vue";

/**
 * Capitalize all letters of a string
 */
Vue.filter("capitalize", val => val.toUpperCase());

/**
 * Proper case a string (capitalize the first letter only)
 */
Vue.filter("propercase", val => {
  if (val === "iot") {
    return "IoT";
  } else {
    return val.charAt(0).toUpperCase() + val.substr(1);
  }
});

/**
 * Return a string, displayed in USD currency, from a raw number
 */
Vue.filter("asCurrency", val => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(val);
});

/**
 * Add percentage to raw number
 */
Vue.filter("asPercentage", val => `${val}%`);

Vue.filter("reg_format", val => {
  if (val === "A") {
    return "Reg A+";
  } else {
    return `Reg ${val}`;
  }
});
