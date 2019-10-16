import { storiesOf } from "@storybook/vue";

import EmailCapture from "./index.vue";

storiesOf("Home Page Sections", module).add("Section - CTA", () => ({
  components: { EmailCapture },
  template: `<email-capture />`
}));
