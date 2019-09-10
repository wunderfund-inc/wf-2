import { storiesOf } from "@storybook/vue";

import MainNavigation from "./index.vue";

storiesOf("Main Navigation", module).add("Default Navbar", () => ({
  components: { MainNavigation },
  template: `
    <main-navigation />
  `
}));
