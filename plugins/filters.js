import Vue from "vue";

Vue.filter("capitalize", val => val.toUpperCase());
Vue.filter("propercase", val => val.charAt(0).toUpperCase() + val.substr(1));
