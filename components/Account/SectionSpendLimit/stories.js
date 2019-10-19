import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

import SectionSpendLimit from "./index.vue";

storiesOf("Page - User Account", module)
  .addDecorator(withKnobs)
  .add("Section - Spend Limit Display", () => ({
    components: { SectionSpendLimit },
    props: {
      spendPool: {
        type: Number,
        default: () => number("Spend Pool", 2200)
      },
      spendMax: {
        type: Number,
        default: () => number("Max Spend", 2200)
      }
    },
    template: `
      <b-container class="py-5">
        <section-spend-limit :spend-pool="spendPool" :spend-max="spendMax" />
      </b-container>
    `
  }));
