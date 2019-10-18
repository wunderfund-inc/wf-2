import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

import AccountProfile from "./index.vue";

storiesOf("Account Page Components", module)
  .addDecorator(withKnobs)
  .add("Card - Profile", () => ({
    components: { AccountProfile },
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
        <account-profile :spend-pool="spendPool" :spend-max="spendMax" />
      </b-container>
    `
  }));
