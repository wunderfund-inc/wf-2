import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import AccountProfile from "./index.vue";

storiesOf("Page - User Account", module)
  .addDecorator(withKnobs)
  .add("Section - Profile", () => ({
    components: { AccountProfile },
    props: {
      spendPool: {
        type: Number,
        default: () => number("Spend Pool", 2200)
      },
      spendMax: {
        type: Number,
        default: () => number("Max Spend", 2200)
      },
      isAccredited: {
        type: Boolean,
        default: () => boolean("Already Accredited?", false)
      }
    },
    template: `
      <b-container class="py-5">
        <account-profile
          :spend-pool="spendPool"
          :spend-max="spendMax"
          :is-accredited="isAccredited"
        />
      </b-container>
    `
  }));
