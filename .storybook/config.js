import { configure } from "@storybook/vue";
import "./plugins/bootstrap-vue";
import "./plugins/filters";
import "./plugins/font-awesome";
import "./plugins/nuxt-link";
import "./plugins/vuex";

const req = require.context("../components", true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
