<template>
  <b-tab
    :title="`Regulation ${offering.offering_type} Offering`"
    title-item-class="text-center"
    no-body
  >
    <b-card-body>
      <div class="text-center text-md-left">
        <b-card-title title-tag="h2">
          Raised:
          <strong class="text-success">{{ currentRaise | asCurrency }}</strong>
        </b-card-title>

        <b-card-title title-tag="h5">
          # Investments:
          <strong>{{ investmentCount }}</strong>
        </b-card-title>

        <b-card-sub-title class="my-2">
          <template v-if="offering.security_type === 'Equity'">
            Goal:
            {{
              (offering.securities_min_sell * offering.price_per_share)
                | currencyDisplayFormat
            }}
            -
            {{
              (offering.securities_total * offering.price_per_share)
                | currencyDisplayFormat
            }}
          </template>
          <template v-else>
            Goal: {{ offering.offering_raise_min | currencyDisplayFormat }} -
            {{ offering.offering_raise_max | currencyDisplayFormat }}
          </template>
        </b-card-sub-title>

        <template v-if="!offeringEnded && endingSoon">
          <b-card-title class="h6">
            Time Left:
            <strong class="h3">
              {{ offering.offering_date_end | timeDistance }}
            </strong>
          </b-card-title>
        </template>
      </div>

      <template v-if="offering.security_type === 'Promissory Note'">
        <b-card-text class="mb-0">
          {{ companyName }} will pay your <strong>debt</strong> back in
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
          {{ companyName }} will pay
          <strong>{{ offering.percent_per_period }}%</strong> of
          {{ offering.revenue_type.toLowerCase() }} revenues to its investors on
          a {{ offering.payment_interval.toLowerCase() }} basis until it pays
          off <strong>{{ `${offering.return_multiplier}x` }}</strong>
          your investment amount.
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
          which will be calculated as (your amount invested /
          <strong>{{ offering.valuation_cap | currencyDisplayFormat }}</strong>
          {{ offering.valuation_type }} valuation).
        </b-card-text>
        <b-card-text class="mb-0">
          Minimum Shares to Invest in:
          <strong>{{ offering.securities_min }}</strong>
          <small class="text-muted">
            (x {{ offering.price_per_share | asCurrency }}/share =
            {{
              (offering.price_per_share * offering.securities_min) | asCurrency
            }}
            minimum)
          </small>
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
        <div class="pt-3">
          <small class="row d-flex justify-content-around">
            <prismic-link
              v-if="offering.agreement_offering.url"
              :field="offering.agreement_offering"
              class="text-decoration-none"
              target="_blank"
            >
              <solid-icon i="file-pdf" />
              Offering Agreement
            </prismic-link>
            <prismic-link
              v-if="offering.agreement_subscription.url"
              :field="offering.agreement_subscription"
              class="text-decoration-none"
              target="_blank"
            >
              <solid-icon i="file-pdf" />
              Subscription Agreement
            </prismic-link>
          </small>
        </div>
      </template>

      <div v-if="offering.accredited_investors_only" class="row mb-md-3">
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

      <b-navbar
        v-if="!offeringEnded"
        fixed="bottom"
        variant="transparent"
        class="d-block d-md-none"
      >
        <nuxt-link
          :to="
            signedIn
              ? `/${$route.params.companyId}/verify`
              : `/auth/login?return_to=/${$route.params.companyId}`
          "
          class="text-decoration-none w-100 d-md-none"
        >
          <main-button extra-classes="btn-block px-5 py-3">
            {{ signedIn ? "Invest Now" : "Login to Invest" }}
          </main-button>
        </nuxt-link>
      </b-navbar>

      <nuxt-link
        v-if="!offeringEnded"
        :to="
          signedIn
            ? `/${$route.params.companyId}/verify`
            : `/auth/login?return_to=/${$route.params.companyId}`
        "
        class="text-decoration-none d-none d-md-block mt-3"
      >
        <main-button class="mb-0 py-3 btn-block">
          {{ signedIn ? "Invest Now" : "Login to Invest" }}
        </main-button>
      </nuxt-link>

      <b-alert v-else show variant="warning" class="py-3 mt-3 mb-0 text-center">
        This offering has ended.
      </b-alert>
    </b-card-body>
  </b-tab>
</template>

<script>
import differenceInDays from "date-fns/differenceInDays";
import isAfter from "date-fns/isAfter";
import { doc, getDoc } from "firebase/firestore/lite";
import MainButton from "@/components/MainButton";
import SolidIcon from "@/components/SolidIcon";
import { db } from "@/plugins/firebase";

export default {
  components: { MainButton, SolidIcon },
  props: {
    companyName: {
      type: String,
      required: true,
    },
    offering: {
      type: Object,
      default() {},
      required: true,
    },
  },
  data() {
    return {
      currentRaise: 0,
      investmentCount: 0,
    };
  },
  computed: {
    signedIn() {
      return !!this.$store.state.auth.email;
    },
    endingSoon() {
      return (
        differenceInDays(
          new Date(this.offering.offering_date_end),
          new Date()
        ) < 30
      );
    },
    offeringEnded() {
      return isAfter(new Date(), new Date(this.offering.offering_date_end));
    },
  },
  async created() {
    try {
      const offeringId = this.offering.offering_data.id;
      const docRef = doc(db, `metrics_per_offering/${offeringId}`);
      const snapshot = await getDoc(docRef);
      const metrics = snapshot.data();

      this.currentRaise = metrics.total_raise;
      this.investmentCount = metrics.total_investments;
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
};
</script>

<style scoped>
.card {
  -webkit-box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
  -moz-box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
  box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
}
</style>
