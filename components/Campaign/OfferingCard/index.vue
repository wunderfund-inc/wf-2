<template>
  <b-tab
    :title="`Regulation ${offering.offering_type} Offering`"
    title-item-class="text-center"
    no-body
  >
    <b-card-body>
      <b-card-title class="text-center text-md-left">
        <span>
          Raised:
          <strong class="text-success">{{ currentRaise | asCurrency }}</strong>
          <small class="text-muted h6">
            (Goal: {{ offering.offering_raise_min | currencyDisplayFormat }} -
            {{ offering.offering_raise_max | currencyDisplayFormat }})
          </small>
        </span>
        <br />
        <span class="h5">
          Investments: <strong>{{ investmentCount }}</strong>
        </span>
        <br />
        <span class="h5">
          Days Left:
          <strong>{{ offering.offering_date_end | timeDistance }}</strong>
        </span>
      </b-card-title>

      <template v-if="offering.security_type === 'Promissory Note'">
        <b-card-text class="mb-0">
          {{ companyName }} will pay your <strong>loan</strong> back in
          <strong>{{ offering.payment_interval.toLowerCase() }}</strong>
          installments made over
          <strong>
            {{ offering.months_to_maturity / 12 }}
            {{ offering.months_to_maturity === 12 ? "year" : "years" }}
          </strong>
          at a
          <strong>{{ offering.interest_rate }}%</strong> interest rate.
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Amount to Invest:
          <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
        </b-card-text>
      </template>

      <template v-if="offering.security_type === 'Revenue Share'">
        <b-card-text>
          {{ companyName }} will pay {{ offering.percent_per_period }}% of
          {{ offering.revenue_type.toLowerCase() }} revenues to its investors on
          a {{ offering.payment_interval.toLowerCase() }} basis until it pays
          off {{ offering.return_multiplier }}x your investment amount.
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Amount to Invest:
          <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
        </b-card-text>
      </template>

      <template v-if="offering.security_type === 'Convertible Note'">
        <b-card-text>
          {{ companyName }}
        </b-card-text>
      </template>

      <template v-if="offering.security_type === 'Equity'">
        <b-card-text>
          {{ companyName }} is offering you <strong>equity</strong> ownership at
          <strong>
            {{ offering.price_per_share | asCurrency }} per share,
          </strong>
          which will be calculated as (amount invested /
          <strong>
            {{
              (offering.price_per_share * offering.securities_total)
                | currencyDisplayFormat
            }}
          </strong>
          {{ offering.valuation_type }} valuation).
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Shares to Invest:
          <strong>{{ offering.securities_min }}</strong>
        </b-card-text>
      </template>

      <template v-if="offering.security_type === 'SAFE Note'">
        <b-card-text class="text-justify">
          {{ companyName }} is offering a
          <strong>{{ `${offering.percent_discount}%` }}</strong>
          discount on future shares into their company.
          <span v-if="offering.valuation_cap || offering.valuation_cap > 0">
            You're speculating that {{ companyName }} will be worth more than
            <strong>
              {{ offering.valuation_cap | currencyDisplayFormat }}
            </strong>
            in the future.
          </span>
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Amount to Invest:
          <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
        </b-card-text>
      </template>

      <template v-if="offering.security_type === 'SAFT Note'">
        <b-card-text>
          {{ companyName }}
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Amount to Invest:
          {{ offering.minimum_investment_amount | asCurrency }}
        </b-card-text>
      </template>

      <template
        v-if="
          offering.agreement_offering.url || offering.agreement_subscription.url
        "
      >
        <div class="row pt-3">
          <div class="col-12 col-md-6 text-center">
            <small>
              <prismic-link
                v-if="offering.agreement_offering.url"
                :field="offering.agreement_offering"
                class="text-decoration-none"
              >
                <solid-icon i="file-pdf" />
                Offering Agreement
              </prismic-link>
            </small>
          </div>

          <div class="col-12 col-md-6 text-center">
            <small>
              <prismic-link
                v-if="offering.agreement_subscription.url"
                :field="offering.agreement_subscription"
                class="text-decoration-none"
              >
                <solid-icon i="file-pdf" />
                Subscription Agreement
              </prismic-link>
            </small>
          </div>
        </div>
      </template>

      <div v-if="offering.accredited_investors_only" class="row">
        <div class="col">
          <small class="text-muted">
            * This offering is for
            <b-link
              href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-3"
              target="_blank"
            >
              accredited investors
            </b-link>
            only.
          </small>
        </div>
      </div>
    </b-card-body>
  </b-tab>
</template>

<script>
import SolidIcon from "@/components/Common/SolidIcon";

export default {
  components: { SolidIcon },
  props: {
    companyName: {
      type: String,
      required: true
    },
    offering: {
      type: Object,
      default() {},
      required: true
    }
  },
  data() {
    return {
      currentRaise: 0,
      investmentCount: 0
    };
  },
  created() {
    this.investmentCount = this.offering.investments.length;

    if (this.offering.investments.length > 0) {
      const investmentData = this.offering.investments.map(el => {
        return el.investment_amount;
      });

      const multiplier =
        this.offering.security_type === "EQUITY"
          ? this.offering.price_per_share
          : 1;

      this.currentRaise =
        multiplier * investmentData.reduce((tot = 0, num) => tot + num);
    }
  }
};
</script>

<style scoped>
.card {
  -webkit-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
  -moz-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
  box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
}
</style>
