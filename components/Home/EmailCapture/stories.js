import { storiesOf } from "@storybook/vue";

import EmailCapture from "./index.vue";

storiesOf("Page - Home", module).add("Section - CTA", () => ({
  components: { EmailCapture },
  template: `<email-capture />`
}));
