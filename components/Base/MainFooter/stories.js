import { storiesOf } from "@storybook/vue";

import MainFooter from "./index.vue";

storiesOf("Base Components", module).add("Default footer", () => ({
  components: { MainFooter },
  template: `
    <main-footer />
  `
}));
