import { storiesOf } from "@storybook/vue";

import MainNavigation from "./index.vue";

storiesOf("Base Components", module).add("Main Navbar", () => ({
  components: { MainNavigation },
  template: `
    <main-navigation />
  `
}));
