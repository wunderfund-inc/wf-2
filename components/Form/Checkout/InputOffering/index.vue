<template>
  <div>
    <label
      :class="isSelected ? 'border border-primary' : ''"
      class="card py-2 pl-1 mb-md-0"
    >
      <div class="container">
        <div class="form-row form-check-inline">
          <b-form-radio
            v-model="selectedOffering"
            :value="offering"
            :disabled="needsAccreditation && !isAccredited"
            class="form-check-input"
            size="lg"
            name="offerings"
          >
            <span class="form-check-label">
              Regulation {{ offering.offering_type | regulationFormat }}
            </span>
          </b-form-radio>
        </div>

        <div class="form-row text-muted pt-3">
          <template v-if="offering.security_type === 'Promissory Note'">
            <p>
              <small>
                The debt will accrue interest at
                <strong>{{ offering.interest_rate }}%</strong>
                per year. The debt schedule pays back the investor in equal
                {{ offering.payment_interval.toLowerCase() }} installments made
                over
                <strong>
                  {{ offering.months_to_maturity / 12 }}
                  {{ offering.months_to_maturity === 12 ? "year" : "years" }}.
                </strong>
              </small>
            </p>
            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Revenue Share'">
            <p>
              <small>
                This debt will pay
                <strong>{{ offering.percent_per_period }}%</strong> of
                {{ offering.revenue_type.toLowerCase() }} revenues on
                {{ offering.payment_interval === "Annual" ? "an" : "a" }}
                {{ offering.payment_interval.toLowerCase() }} basis until it
                pays off <strong>{{ `${offering.return_multiplier}x` }}</strong>
                the investment amount.
              </small>
            </p>

            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Convertible Note'">
            <p>
              <small>
                Equity ownership calculated as (Amount Invested /
                {{ offering.valuation_type.toLowerCase() }} valuation of
                <strong>
                  {{ offering.valuation_cap | currencyDisplayFormat }}
                </strong>
                ).
              </small>
            </p>

            <p class="mb-0">
              <small>
                Price Per Share:
                <strong>{{ offering.price_per_share | asCurrency }}</strong>
              </small>
              <br />
              <small>
                Minimum Shares to Invest in:
                <strong>{{ offering.securities_min }}</strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Equity'">
            <p>
              <small>
                Equity ownership calculated as (Amount Invested /
                {{ offering.valuation_type.toLowerCase() }} valuation of
                <strong>
                  {{
                    (offering.price_per_share * offering.securities_total)
                      | currencyDisplayFormat
                  }}
                </strong>
                ).
              </small>
            </p>

            <p class="mb-0">
              <small>
                Price Per Share:
                <strong>{{ offering.price_per_share | asCurrency }}</strong>
              </small>
              <br />
              <small>
                Minimum Shares to Invest in:
                <strong>{{ offering.securities_min }}</strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'SAFE Note'">
            <p>
              <small v-if="offering.early_bird_percent && !ebExpired">
                Right now, your investment will give you a
                <strong>{{ `${offering.early_bird_percent}%` }}</strong>
                discount on futures shares in this company.
                <span v-if="offering.early_bird_amount">
                  After this company raises at least
                  <strong>
                    {{ offering.early_bird_amount | currencyDisplayFormat }},
                  </strong>
                  the discount decreases to
                  <strong>{{ `${offering.percent_discount}%` }}.</strong>
                </span>
                <span v-else-if="offering.early_bird_date_end">
                  After
                  <strong>
                    {{ formatDate(offering.early_bird_date_end) }},
                  </strong>
                  the discount decreases to
                  <strong>{{ `${offering.percent_discount}%.` }}</strong>
                </span>
              </small>

              <small v-else>
                Your investment gives you a
                <strong>{{ `${offering.percent_discount}%` }}</strong>
                discount on future shares into this company.
              </small>

              <small v-if="offering.valuation_cap">
                You're speculating that the company will be worth more than
                <strong>
                  {{ offering.valuation_cap | currencyDisplayFormat }}
                </strong>
                in the future.
              </small>
            </p>

            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <!-- TODO -->
          <!-- <template v-if="offering.security_type === 'SAFT Note'"></template> -->
        </div>
      </div>
    </label>

    <small v-if="needsAccreditation" class="text-muted ml-2">
      *Accredited investors only -
      <nuxt-link to="/faq/investors">Learn More.</nuxt-link>
    </small>
  </div>
</template>

<script>
import { endedAlready } from "@/helpers/validators";

export default {
  props: {
    offering: {
      type: Object,
      default() {},
      required: true,
    },
  },
  computed: {
    selectedOffering: {
      get() {
        return this.$store.state.agreement.offering;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "method",
          val: null,
        });

        this.$store.dispatch("agreement/setAttribute", {
          prop: "amount",
          val: null,
        });

        this.$store.dispatch("agreement/setAttribute", {
          prop: "offering",
          val,
        });

        this.$store.dispatch("agreement/setAttribute", {
          prop: "amountType",
          val: ["Equity", "Convertible Note"].includes(val.security_type)
            ? "SHARES"
            : "RAW",
        });
      },
    },
    isSelected() {
      return this.selectedOffering === this.offering;
    },
    ebExpired() {
      if (this.offering.early_bird_amount) {
        const raise = 4000; // TODO: this.$store.getters["offering/totalRaise"];
        return raise >= this.offering.early_bird_amount;
      } else if (this.offering.early_bird_date_end) {
        return endedAlready(this.offering.early_bird_date_end);
      } else {
        return false;
      }
    },
    needsAccreditation() {
      const {
        accredited_investors_only: accInvOnly,
        offering_type: offeringType,
      } = this.offering;

      return offeringType === "CF" ? false : accInvOnly;
    },
    isAccredited() {
      return this.$store.getters["profile/accredited"];
    },
  },
};
</script>
