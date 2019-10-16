import { storiesOf } from "@storybook/vue";

import HeroSection from "./index.vue";

storiesOf("Home Page Sections", module).add("Section - Hero", () => ({
  components: { HeroSection },
  template: `<hero-section />`
}));
