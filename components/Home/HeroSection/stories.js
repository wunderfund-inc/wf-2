import { storiesOf } from "@storybook/vue";

import HeroSection from "./index.vue";

storiesOf("Page - Home", module).add("Section - Hero", () => ({
  components: { HeroSection },
  template: `<hero-section />`
}));
