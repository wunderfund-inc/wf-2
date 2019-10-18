import { storiesOf } from "@storybook/vue";

import d from "../data.json";
import AccountInvestmentList from "./index.vue";

export const investments = d.investments;

storiesOf("Account Page Components", module).add(
  "Card - List of Investments",
  () => ({
    components: { AccountInvestmentList },
    data() {
      return { investments };
    },
    template: `
      <b-container class="py-5">
        <account-investment-list :investments="investments" />
      </b-container>
    `
  })
);
