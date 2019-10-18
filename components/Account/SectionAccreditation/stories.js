import { storiesOf } from "@storybook/vue";

import SectionAccreditation from "./index.vue";

storiesOf("Account Page Components", module).add(
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
