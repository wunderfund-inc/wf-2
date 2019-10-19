import { storiesOf } from "@storybook/vue";

import Component from "./index.vue";

storiesOf("Page - Raise Capital", module).add("Section - Jumbotron", () => ({
  components: { Component },
  template: `<component />`
}));
