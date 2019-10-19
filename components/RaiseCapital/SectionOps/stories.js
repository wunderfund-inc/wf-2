import { storiesOf } from "@storybook/vue";

import Component from "./index.vue";

storiesOf("Page - Raise Capital", module).add(
  "Section - How does it work?",
  () => ({
    components: { Component },
    template: `<component />`
  })
);
