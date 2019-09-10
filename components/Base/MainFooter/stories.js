import { storiesOf } from "@storybook/vue";

import MainFooter from "./index.vue";

storiesOf("Main Footer", module).add("Default footer", () => ({
  components: { MainFooter },
  template: `
    <main-footer />
  `
}));
