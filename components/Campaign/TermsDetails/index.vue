<template>
  <section
    :style="`background-color: ${bgColor}`"
    class="terms-details bg-custom d-print-none"
  >
    <div v-if="!offering" class="container py-5 text-light">
      <p>
        <strong>{{ companyName }}</strong> is not offering anything (yet!). In
        order to ensure we have the best possible deal for you, please answer
        the survey above so we can make a deal in the future.
      </p>
    </div>
    <div v-else class="container py-5 text-light">
      <h2 class="text-center pb-3">Terms of the Offering</h2>

      <!-- <template v-if="offering.security_type === 'Promissory Note'"></template> -->

      <!-- <template v-if="offering.security_type === 'Revenue Share'"></template> -->

      <template v-if="offering.security_type === 'Convertible Note'">
        <p>
          <strong>{{ companyName }}</strong> is offering common equity in the
          company. By investing in the company, you're expecting we'll increase
          the company worth beyond the valuation below.
        </p>
        <p>
          Before investing, please review the full terms of the offering
          memorandum and related documents. As a shareholder, you should expect
          to hold your shares for the long-term, because your investment is not
          liquid until the company is acquired, conducts an IPO, or has some
          other liquidity event.
        </p>
        <p>
          *Your investment amount will round down to the nearest whole share
        </p>
        <p>
          <strong>{{ offering.valuation_type }} Valuation:</strong>
          {{ offering.valuation_cap | currencyDisplayFormat }}.
        </p>
        <p>
          <strong>Target Raise:</strong>
          {{ offering.offering_raise_min | currencyDisplayFormat }}, up to
          {{ offering.offering_raise_max | currencyDisplayFormat }}
        </p>
        <p>
          <strong>Minimum Investment:</strong>
          {{
            (offering.price_per_share * offering.securities_min) | asCurrency
          }}
          <span class="small">
            (for {{ offering.securities_min }}
            {{ offering.securities_min === 1 ? "share" : "shares" }} minimum at
            {{ offering.price_per_share | asCurrency }}/share)
          </span>
        </p>
      </template>

      <template v-if="offering.security_type === 'Equity'">
        <p>
          <strong>{{ companyName }}</strong> is offering common equity in the
          company. By investing in the company, you're expecting we'll increase
          the company worth beyond the valuation below.
        </p>
        <p>
          Before investing, please review the full terms of the offering
          memorandum and related documents. As a shareholder, you should expect
          to hold your shares for the long-term, because your investment is not
          liquid until the company is acquired, conducts an IPO, or has some
          other liquidity event.
        </p>
        <p>
          *Your investment amount will round down to the nearest whole share
        </p>
        <p>
          <strong>{{ offering.valuation_type }} Valuation:</strong>
          {{ offering.valuation_cap | currencyDisplayFormat }}.
        </p>
        <p>
          <strong>Target Raise:</strong>
          <template v-if="offering.securities_min_sell">
            {{
              (offering.price_per_share * offering.securities_min_sell)
                | currencyDisplayFormat
            }}, up to
            {{
              (offering.price_per_share * offering.securities_total)
                | currencyDisplayFormat
            }}
          </template>
          <template v-else>
            {{
              (offering.price_per_share * offering.securities_total)
                | currencyDisplayFormat
            }}
          </template>
        </p>
        <p>
          <strong>Minimum Investment:</strong>
          {{
            (offering.price_per_share * offering.securities_min) | asCurrency
          }}
          <span class="small">
            (for {{ offering.securities_min }}
            {{ offering.securities_min === 1 ? "share" : "shares" }} minimum at
            {{ offering.price_per_share | asCurrency }}/share)
          </span>
        </p>
      </template>

      <template v-if="offering.security_type === 'SAFE Note'">
        <p>
          The Simple Agreement for Future Equity (SAFE) is a popular option new
          companies raising capital. {{ companyName }} is offering future equity
          shares in their company. Before investing, please review the full
          terms of the SAFE Agreement.
        </p>
        <p>
          <strong>Target Raise:</strong> Minimum
          {{ offering.offering_raise_min | currencyDisplayFormat }}, up to
          {{ offering.offering_raise_max | currencyDisplayFormat }}
        </p>
        <p>
          <strong>Minimum Investment:</strong>
          {{ offering.minimum_investment_amount | asCurrency }}
        </p>
        <p v-if="offering.early_bird_percent">
          <strong>Discount Details:</strong>
          <span v-if="offering.early_bird_amount">
            {{ `${offering.early_bird_percent}%` }} for the first
            {{ offering.early_bird_amount | currencyDisplayFormat }} invested,
            {{ `${offering.percent_discount}%` }} thereafter.
          </span>
          <span v-else>
            {{ `${offering.early_bird_percent}%` }} until
            {{ offering.early_bird_date_end }}, then it becomes
            {{ `${offering.percent_discount}%` }}.
          </span>
        </p>
        <p v-else>
          <strong>Discount Details:</strong> {{ offering.percent_discount }}%
        </p>
        <p v-if="offering.valuation_type !== 'None'">
          <strong>{{ offering.valuation_type }} Valuation:</strong>
          {{ offering.valuation_cap | currencyDisplayFormat }}. This means
          speculating the company will be worth more than this amount in the
          future. Since your investment will be against this valuation cap, it
          would result in a higher percentage of ownership, compared to the
          later round investors who would be investing against a higher
          valuation.
        </p>
      </template>

      <!-- <template v-if="offering.security_type === 'SAFT Note'"></template> -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true,
    },
    offering: {
      type: Object,
      default() {},
      required: false,
    },
  },
  computed: {
    bgColor() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "#003b5a";
        case "WFH":
          return "#007bff";
        default:
          return "#6c757d";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-custom {
  filter: brightness(1.3);
}
</style>
