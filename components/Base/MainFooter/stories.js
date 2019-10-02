import { storiesOf } from "@storybook/vue";

import MainFooter from "./index.vue";

storiesOf("Base Components", module).add("Main Footer", () => ({
  components: { MainFooter },
  template: `
    <main-footer />
  `
}));
