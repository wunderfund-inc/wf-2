import { configure } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

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

const req = require.context("../components", true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
