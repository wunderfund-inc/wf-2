import { storiesOf } from "@storybook/vue";

import Component from "./index.vue";

storiesOf("Page - Raise Capital", module).add(
  "Section - What makes us unique?",
  () => ({
    components: { Component },
    template: `<component />`
  })
);
