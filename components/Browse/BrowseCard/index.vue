<template>
  <nuxt-link :to="`/${company.uid}`" class="text-decoration-none text-dark">
    <b-card
      :img-src="company.data.company_bg_img.url || ''"
      img-top
      no-body
      class="my-2"
    >
      <b-media class="container mt-3">
        <template v-slot:aside>
          <b-img
            :src="company.data.company_logo.url"
            :alt="company.data.company_name_short"
            width="64"
            fluid
            rounded
            center
            thumbnail
          />
        </template>
        <h5 class="mt-0">{{ company.data.company_name_short }}</h5>
        <p class="text-muted">{{ company.data.company_motto }}</p>
      </b-media>

      <b-list-group v-for="(offering, index) in offerings" :key="index" flush>
        <b-list-group-item class="text-md-center">
          <!-- <b-badge size="lg" class="card-badge">
            Reg {{ offering.offering_type }}
          </b-badge> -->

          <template v-if="offering.security_type === 'Promissory Note'">
            <small class="mb-0 text-muted">
              Loan repaid at a {{ offering.interest_rate }}% interest rate
            </small>
          </template>

          <template v-if="offering.security_type === 'Revenue Share'">
            <small class="mb-0 text-muted">
              Revenue-based loan at a {{ offering.return_multiplier }}x return
            </small>
          </template>

          <template v-if="offering.security_type === 'Convertible Note'">
            <small class="mb-0 text-muted">
              Equity at a
              {{ offering.valuation_cap | currencyDisplayFormat }}
              {{ offering.valuation_type.toLowerCase() }} valuation
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

            <small v-else class="mb-0 ml-2 text-muted">
              Future Equity at a {{ offering.percent_discount }}% discount
            </small>
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
          :class="
            `text-center ${
              offeringEnded(offering.offering_date_end) ? 'bg-success' : ' '
            }`
          "
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
            <template v-if="offering.metrics">
              <template v-if="offering.security_type === 'Equity'">
                <template v-if="offering.securities_min_sell">
                  {{
                    `${100 *
                      (
                        offering.metrics.total_raise /
                        (offering.price_per_share *
                          offering.securities_min_sell)
                      ).toFixed(2)}%`
                  }}
                  Funded
                </template>
                <template v-else>
                  {{
                    `${100 *
                      (
                        offering.metrics.total_raise /
                        (offering.price_per_share * offering.securities_total)
                      ).toFixed(2)}%`
                  }}
                  Funded
                </template>
              </template>
              <template v-else>
                {{
                  `${100 *
                    (
                      offering.metrics.total_raise / offering.offering_raise_min
                    ).toFixed(2)}%`
                }}
                Funded
              </template>
            </template>
            <template v-else>
              0% Funded
            </template>
          </small>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </nuxt-link>
</template>

<script>
import { db } from "@/plugins/firebase";
import { endingSoon, endedAlready } from "@/helpers/validators";

export default {
  props: {
    company: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      offerings: []
    };
  },
  async created() {
    const offeringRefs = this.company.data.company_offerings;

    const offerings = await Promise.all(
      offeringRefs.map(async offering => {
        const offeringId = offering.offering_data.id;

        const offeringRef = await db
          .collection("metrics_per_offering")
          .doc(offeringId)
          .get();

        return {
          ...(await this.$prismic.api.getByID(offering.offering_data.id)).data,
          ...offering,
          metrics: offeringRef.data()
        };
      })
    );

    this.offerings = offerings;
  },
  methods: {
    endingSoon(date) {
      return endingSoon(date);
    },
    offeringEnded(date) {
      return endedAlready(date);
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #0091ea;
$font: "Montserrat", sans-serif;

a {
  .card {
    .card-badge {
      background-color: rgba(236, 195, 11, 0.5);
      color: #494949;
      font-size: 12px;
      padding: 7px;
      font-family: $font;
      font-weight: 400;
    }
  }
  .card:hover {
    cursor: pointer;
    text-decoration: none;
    -webkit-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    -moz-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
  }
}
</style>
