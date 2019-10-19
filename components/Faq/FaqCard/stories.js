import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

import FaqCard from "./index.vue";

storiesOf("Page - FAQs", module)
  .addDecorator(withKnobs)
  .add("Card - Topic", () => ({
    components: { FaqCard },
    props: {
      text: {
        type: String,
        default: () => text("Text", "General")
      }
    },
    template: `
      <b-container class="py-5">
        <b-row>
          <b-col cols="3">
            <faq-card :faq-link="text">
          </b-col>
        </b-row>
      </b-container>
    `
  }));
