import { storiesOf } from "@storybook/vue";

import AccountInvestmentList from "./index.vue";

storiesOf("Account Page Components", module).add("List of Investments", () => ({
  components: { AccountInvestmentList },
  template: `
    <b-container class="py-5">
      <b-row>
        <b-col cols="9">
          <account-investment-list />
        </b-col>
      </b-row>
    </b-container>
  `
}));
