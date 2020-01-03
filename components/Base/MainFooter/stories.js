import { storiesOf } from "@storybook/vue";

import MainFooter from "./index.vue";

storiesOf("Layout", module).add("Main Footer", () => ({
  components: { MainFooter },
  template: `<main-footer />`
}));
