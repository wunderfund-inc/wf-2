import { storiesOf } from "@storybook/vue";

import Component from "./index.vue";

storiesOf("Page - Raise Capital", module).add("Eligibility?", () => ({
  components: { Component },
  template: `<component />`
}));
