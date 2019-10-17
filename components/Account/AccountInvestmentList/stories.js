import { storiesOf } from "@storybook/vue";

import d from "../data.json";
import AccountInvestmentList from "./index.vue";

export const investments = d.investments;

storiesOf("Account Page Components", module).add("List of Investments", () => ({
  components: { AccountInvestmentList },
  data() {
    return { investments };
  },
  template: `
    <b-container class="py-5">
      <b-row>
        <b-col cols="9">
          <account-investment-list :investments="investments" />
        </b-col>
      </b-row>
    </b-container>
  `
}));
