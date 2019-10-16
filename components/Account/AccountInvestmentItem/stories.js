import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import AccountInvestmentItem from "./index.vue";
import d from "./data.json";
const investment = d.investments[0];

storiesOf("Account Page Components", module)
  .addDecorator(withKnobs)
  .add("Investment Item", () => ({
    components: { AccountInvestmentItem },
    props: {
      investment: {
        default: {
          id: text("Campaign ID", investment.companyId),
          companyLogo: text("Company Logo", investment.companyLogo),
          companyNickname: text(
            "Name of the Company",
            investment.companyNickname
          ),
          companyPricePerShare: number(
            "Price Per Share",
            investment.companyPricePerShare
          ),
          companyUnitPrice: number("Unit Price", investment.companyUnitPrice),
          amount: number("Investment Amount", investment.amount)
        }
      }
    },
    template: `
      <b-container class="py-5">
        <b-row>
          <b-col cols="9">
            <b-card>
              <account-investment-item :investment="investment" />
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    `
  }));
