<template>
  <section class="pt-2 pb-3">
    <div class="text-center text-md-left">
      <h2>
        Raised:
        <strong class="text-success">
          {{ investmentsTotal | asCurrency }}
        </strong>
      </h2>

      <h5>
        # Investments:
        <strong>{{ investmentsCount }}</strong>
      </h5>

      <h6 class="text-muted pt-2">
        <template v-if="offering.security_type === 'Equity'">
          <template v-if="offering.securities_min_sell">
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
            Goal:
            {{
              (offering.securities_total * offering.price_per_share)
                | currencyDisplayFormat
            }}
          </template>
        </template>
        <template v-else>
          Goal: {{ offering.offering_raise_min | currencyDisplayFormat }} -
          {{ offering.offering_raise_max | currencyDisplayFormat }}
        </template>
      </h6>
    </div>

    <template v-if="offering.security_type === 'Promissory Note'">
      <p class="mb-0">
        {{ companyName }} will pay your <strong>loan</strong> back in
        <strong>{{ offering.payment_interval.toLowerCase() }}</strong>
        installments made over
        <strong>
          {{ offering.months_to_maturity / 12 }}
          {{ offering.months_to_maturity === 12 ? "year" : "years" }}
        </strong>
        at a
        <strong>{{ offering.interest_rate }}%</strong> interest rate.
      </p>
      <p class="mb-0">
        Minimum Amount to Invest:
        <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
      </p>
    </template>

    <template v-if="offering.security_type === 'Revenue Share'">
      <p>
        {{ companyName }} will pay
        <strong>{{ offering.percent_per_period }}%</strong> of
        {{ offering.revenue_type.toLowerCase() }} revenues to its investors on
        {{ offering.payment_interval.toLowerCase() }} basis until it pays off
        off <strong>{{ `${offering.return_multiplier}x` }}</strong>
        your investment amount.
      </p>
      <p class="mb-0">
        Minimum Amount to Invest:
        <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
      </p>
    </template>

    <template v-if="offering.security_type === 'Convertible Note'">
      <p>
        {{ companyName }} is offering you equity ownership at
        <strong>
          {{ offering.price_per_share | asCurrency }} per share,
        </strong>
        which will be calculated as (your amount invested /
        <strong>{{ offering.valuation_cap | currencyDisplayFormat }}</strong>
        {{ offering.valuation_type.toLowerCase() }} valuation).
      </p>
    </template>

    <template v-if="offering.security_type === 'Equity'">
      <p>
        {{ companyName }} is offering you <strong>equity</strong> ownership at
        <strong>
          {{ offering.price_per_share | asCurrency }} per share,
        </strong>
        which will be calculated as (your amount invested /
        <strong>{{ offering.valuation_cap | currencyDisplayFormat }}</strong>
        {{ offering.valuation_type.toLowerCase() }} valuation).
      </p>
      <p class="mb-0">
        Minimum Shares to Invest in:
        <strong>{{ offering.securities_min }}</strong>
        <small class="text-muted">
          (x {{ offering.price_per_share | asCurrency }}/share =
          {{
            (offering.price_per_share * offering.securities_min) | asCurrency
          }}
          minimum)
        </small>
      </p>
    </template>

    <template v-if="offering.security_type === 'SAFE Note'">
      <p class="text-justify">
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
      </p>
      <p class="mb-0">
        Minimum Amount to Invest:
        <strong>{{ offering.minimum_investment_amount | asCurrency }}</strong>
      </p>
    </template>

    <template v-if="offering.security_type === 'SAFT Note'">
      <p>
        {{ companyName }}
      </p>
      <p class="mb-0">
        Minimum Amount to Invest:
        {{ offering.minimum_investment_amount | asCurrency }}
      </p>
    </template>

    <template
      v-if="
        offering.agreement_offering.url || offering.agreement_subscription.url
      "
    >
      <div class="py-3">
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

    <div v-if="offering.accredited_investors_only" class="row py-3">
      <div class="col">
        <div class="text-center">
          <small class="text-muted">
            *NOTE* This offering is only for
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
    </div>

    <template v-if="!offeringEnded && endingSoon">
      <h3 class="text-center">
        Time Left:
        <strong>{{ offering.offering_date_end | timeDistance }}</strong>
      </h3>
    </template>

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

    <b-alert v-else show variant="success" class="py-3 mt-3 mb-0 text-center">
      This offering has ended.
    </b-alert>
  </section>
</template>

<script>
import { endingSoon, endedAlready } from "@/helpers/validators";
import MainButton from "@/components/Common/MainButton";
import SolidIcon from "@/components/Common/SolidIcon";

export default {
  components: { MainButton, SolidIcon },
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
  computed: {
    signedIn() {
      return !!this.$store.state.auth.email;
    },
    endingSoon() {
      const endDate = this.offering.offering_date_end;
      return endingSoon(endDate);
    },
    offeringEnded() {
      const endDate = this.offering.offering_date_end;
      return endedAlready(endDate);
    },
    metrics() {
      return this.offering.metrics;
    },
    investmentsTotal() {
      return this.metrics.total_raise;
    },
    investmentsCount() {
      return this.metrics.total_investments;
    }
  }
};
</script>
