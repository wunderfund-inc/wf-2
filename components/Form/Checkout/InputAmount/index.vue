<template>
  <div class="form-group mt-3">
    <template v-if="usingShares">
      <b-form-group
        label-cols-lg="6"
        label="Number of shares you wish to buy:"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text text-muted"># Shares</span>
          </div>
          <the-mask
            id="inv-amt"
            v-model.number="amount"
            mask="######"
            class="form-control text-right"
            type="tel"
          />
        </div>

        <div class="row d-flex justify-content-between px-3">
          <h6>Price Per Share:</h6>
          <h6>x {{ offering.price_per_share | asCurrency }}</h6>
        </div>

        <hr class="mt-0 mb-1" />

        <div class="row d-flex justify-content-between px-3">
          <h5>Total Amount:</h5>
          <h4 class="text-success">
            {{ (offering.price_per_share * amount) | asCurrency }}
          </h4>
        </div>

        <b-form-text
          :text-variant="validInput ? 'muted' : 'danger font-weight-bold'"
          class="pt-2"
        >
          *Your commitment to invest in this offering needs to be at minimum
          {{ offering.securities_min }}
          {{ offering.securities_min === 1 ? "share" : "shares" }}
        </b-form-text>

        <b-form-text
          v-if="invalidCCAmount"
          text-variant="danger"
          class="font-weight-bold"
        >
          *You may only invest up to $4999 using a credit card.
        </b-form-text>
      </b-form-group>
    </template>

    <template v-else>
      <b-form-group
        label-cols-lg="6"
        label="Amount you wish to invest:"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text text-muted">USD</span>
          </div>

          <vue-numeric
            v-model="amount"
            :empty-value="offering.minimum_investment_amount"
            v-bind:min="offering.minimum_investment_amount"
            v-bind:max="currentSpendPool"
            v-bind:precision="2"
            currency="$"
            separator=","
            class="form-control"
            type="tel"
          />
        </div>

        <b-form-text>
          *Your commitment to invest needs to be at least
          {{ offering.minimum_investment_amount | asCurrency }}
        </b-form-text>

        <b-form-text>
          *You may only invest up to
          {{ currentSpendPool | asCurrency }} maximum.
        </b-form-text>

        <b-form-text
          v-if="invalidCCAmount"
          text-variant="danger"
          class="font-weight-bold"
        >
          *You may only invest up to $4,999 using a credit card.
        </b-form-text>
      </b-form-group>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VueNumeric from "vue-numeric";
import { TheMask } from "vue-the-mask";

export default {
  components: { VueNumeric, TheMask },
  computed: {
    ...mapState({
      offering: state => state.agreement.offering,
      method: state => state.agreement.method
    }),
    ...mapGetters({
      currentSpendPool: "profile/spendPoolCurrent"
    }),
    amount: {
      get() {
        return this.$store.state.agreement.amount;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "amount",
          val
        });
      }
    },
    validInput() {
      if (
        ["Equity", "Convertible Note"].includes(this.offering.security_type)
      ) {
        return (
          this.amount * this.offering.price_per_share >=
          this.offering.securities_min
        );
      } else {
        return this.amount >= this.offering.minimum_investment_amount;
      }
    },
    invalidCCAmount() {
      if (this.usingShares) {
        return (
          this.method === "CC" &&
          this.amount * this.offering.price_per_share > 4999
        );
      }
      return this.method === "CC" && this.amount > 4999;
    },
    usingShares() {
      return ["Equity", "Convertible Note"].includes(
        this.offering.security_type
      );
    }
  }
};
</script>
