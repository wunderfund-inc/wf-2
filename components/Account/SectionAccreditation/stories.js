import { storiesOf } from "@storybook/vue";

import SectionAccreditation from "./index.vue";

storiesOf("Page - User Account", module).add(
  "Section - Accreditation Info",
  () => ({
    components: { SectionAccreditation },
    template: `
      <b-container class="py-5">
        <section-accreditation />
      </b-container>
    `
  })
);
