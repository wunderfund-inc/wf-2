<template>
  <nuxt-link :to="`/${company.uid}`" class="text-decoration-none text-dark">
    <b-card
      :img-src="company.data.company_bg_img.url || ''"
      img-top
      no-body
      class="my-2"
    >
      <b-media class="container my-3">
        <template #aside>
          <b-img
            :src="company.data.company_logo.url"
            :alt="company.data.company_name_short"
            style="max-height: 64px"
            width="64"
            rounded
            center
            thumbnail
          />
        </template>
        <h5 class="mt-0">{{ company.data.company_name_short }}</h5>
        <p class="text-muted mb-0">{{ company.data.company_motto }}</p>
      </b-media>

      <b-list-group v-if="company.data.ttw_phase" flush>
        <b-list-group-item class="text-center">
          <small class="text-muted">Pre-investment phase</small>
        </b-list-group-item>
      </b-list-group>
      <b-list-group v-else-if="'security_type' in offering" flush>
        <b-list-group-item class="text-center">
          <template v-if="offering.security_type === 'Promissory Note'">
            <small class="mb-0 text-muted">
              Debt repaid at a {{ offering.interest_rate }}% interest rate
            </small>
          </template>

          <template v-if="offering.security_type === 'Revenue Share'">
            <small class="mb-0 text-muted">
              Revenue-based debt at a {{ offering.return_multiplier }}x return
            </small>
          </template>

          <template v-if="offering.security_type === 'Convertible Note'">
            <small class="mb-0 text-muted">
              Convertible Note for a {{ offering.discount_rate }}% discount, ${{
                offering.valuation_cap | properIntegerFormat
              }}
              valuation
            </small>
          </template>

          <template v-if="offering.security_type === 'Equity'">
            <small class="mb-0 text-muted">
              Equity at a
              {{ offering.valuation_cap | currencyDisplayFormat }}
              {{ offering.valuation_type.toLowerCase() }} valuation
            </small>
          </template>

          <template v-if="offering.security_type === 'SAFE Note'">
            <small v-if="offering.valuation_cap > 0" class="mb-0 text-muted">
              Future Equity at a
              {{ offering.valuation_cap | currencyDisplayFormat }} valuation
            </small>

            <small v-if="offering.percent_discount" class="mb-0 text-muted">
              Future Equity at a {{ offering.percent_discount }}% discount
            </small>

            <small v-else class="mb-0 text-muted">Future Equity</small>
          </template>

          <template v-if="offering.security_type === 'SAFT Note'">
            <small v-if="offering.valuation_cap > 0" class="mb-0 text-muted">
              Future tokens at
              {{ offering.valuation_cap | currencyDisplayFormat }} valuation
            </small>

            <small v-else class="mb-0 ml-2 text-muted">
              Future equity at a {{ offering.percent_discount }}% discount
            </small>
          </template>
        </b-list-group-item>
        <b-list-group-item
          :class="`text-center ${
            offeringEnded(offering.offering_date_end) ? `bg-${color}` : ' '
          }`"
        >
          <small
            :class="
              offeringEnded(offering.offering_date_end)
                ? 'text-light'
                : 'text-muted'
            "
          >
            <template v-if="offeringEnded(offering.offering_date_end)">
              <strong>Closed</strong> -
            </template>
            <template v-else>
              <template v-if="endingSoon(offering.offering_date_end)">
                {{ offering.offering_date_end | timeDistance }} left -
              </template>
            </template>
            <template v-if="metrics">
              <template v-if="offering.security_type === 'Equity'">
                <template v-if="offering.securities_min_sell">
                  {{ equityPercentMinSecurities }}% Funded
                </template>
                <template v-else>
                  {{ equityPercentNoMinimum }}% Funded
                </template>
              </template>
              <template v-else>{{ nonEquityPercent }}% Funded</template>
            </template>
            <template v-else>0% Funded</template>
          </small>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </nuxt-link>
</template>

<script>
import { endingSoon, endedAlready } from "@/helpers/validators";

export default {
  props: {
    company: {
      type: Object,
      default() {},
    },
  },
  computed: {
    offering() {
      return this.company.offering;
    },
    metrics() {
      return this.company.metrics;
    },
    equityPercentMinSecurities() {
      const percent =
        this.metrics.total_raise /
        (this.offering.price_per_share * this.offering.securities_min_sell);
      return Number.parseInt(100 * percent);
    },
    equityPercentNoMinimum() {
      const percent =
        this.metrics.total_raise /
        (this.offering.price_per_share * this.offering.securities_total);
      return Number.parseInt(100 * percent);
    },
    nonEquityPercent() {
      const percent =
        this.metrics.total_raise / this.offering.offering_raise_min;
      return Number.parseInt(100 * percent);
    },
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
  methods: {
    endingSoon(date) {
      return endingSoon(date);
    },
    offeringEnded(date) {
      return endedAlready(date);
    },
    percent(num) {
      return Number.parseInt(num);
    },
  },
};
</script>

<style scoped>
a > .card > .card-badge {
  background-color: rgba(236, 195, 11, 0.5);
  color: #494949;
  font-size: 12px;
  padding: 7px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}

a > .card:hover {
  cursor: pointer;
  text-decoration: none;
  -webkit-box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
  -moz-box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
  box-shadow: 0 4px 12px 1px rgba(89, 89, 89, 0.1);
}
</style>
