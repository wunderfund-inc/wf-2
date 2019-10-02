import { storiesOf } from "@storybook/vue";

import MainNavigation from "./index.vue";

storiesOf("Base Components", module).add("Default Navbar", () => ({
  components: { MainNavigation },
  template: `
    <main-navigation />
  `
}));
