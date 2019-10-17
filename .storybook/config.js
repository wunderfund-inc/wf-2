import { configure } from "@storybook/vue";
import "./plugins/bootstrap-vue";
import "./plugins/font-awesome";
import "./plugins/nuxt-link";

const req = require.context("../components", true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
