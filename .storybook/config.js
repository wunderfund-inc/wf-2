import { configure } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faTwitter,
  faTwitterSquare,
  faGoogle,
  faLinkedin,
  faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(BootstrapVue);

Vue.component("nuxt-link", {
  props: ["to"],
  methods: {
    log() {
      action("link target")(this.to)
    },
  },
  template: `<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>`,
});

library.add(faFacebook);
library.add(faFacebookF);
library.add(faFacebookSquare);
library.add(faTwitter);
library.add(faTwitterSquare);
library.add(faGoogle);
library.add(faLinkedin);
library.add(faYoutubeSquare);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const req = require.context("../components", true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
