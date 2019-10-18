import { storiesOf } from "@storybook/vue";

import SectionPasswordReset from "./index.vue";

storiesOf("Account Page Components", module).add(
  "Section - Password Reset",
  () => ({
    components: { SectionPasswordReset },
    template: `
      <b-container class="py-5">
        <section-password-reset />
      </b-container>
    `
  })
);
