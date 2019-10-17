import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

import AccountSpendLimitCard from "./index.vue";

storiesOf("Account Page Components", module)
  .addDecorator(withKnobs)
  .add("Spend Limit Card", () => ({
    components: { AccountSpendLimitCard },
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
        <b-row>
          <b-col cols="9">
            <account-spend-limit-card :spend-pool="spendPool" />
          </b-col>
        </b-row>
      </b-container>
    `
  }));
