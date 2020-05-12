<template>
  <div class="form-group mt-3">
    <template v-if="securityType === 'Equity'">
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
          <h6>x {{ offering.minimum_investment_amount | asCurrency }}</h6>
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
          <vue-autonumeric
            v-model="amount"
            :options="'dollar'"
            class="form-control"
          />
        </div>

        <b-form-text>
          <span
            :class="validInput ? 'text-muted' : 'text-danger font-weight-bold'"
          >
            *Your commitment to invest needs to be at least
            {{ offering.minimum_investment_amount | asCurrency }}
          </span>
          <!-- <br />
          <span
            :class="overInvested ? 'text-danger font-weight-bold' : 'text-muted'"
          >
            - The maximum amount you're allowed to invest at this time is
            {{ spendPool.current | asCurrency }}
          </span> -->
        </b-form-text>
      </b-form-group>
    </template>
  </div>
</template>

<script>
import VueAutonumeric from "vue-autonumeric";
import { TheMask } from "vue-the-mask";

export default {
  components: { VueAutonumeric, TheMask },
  computed: {
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
    offering() {
      return this.$store.state.agreement.offering;
    },
    securityType() {
      return this.offering.security_type;
    },
    validInput() {
      if (this.securityType === "Equity") {
        return (
          this.amount * this.offering.price_per_share >=
          this.offering.securities_min
        );
      } else {
        return this.amount >= this.offering.minimum_investment_amount;
      }
    }
    // overInvested() {
    //   return this.amount >= this.spendPool.current;
    // },
    // spendPool() {
    //   return this.$store.getters["user/spendPool"];
    // }
  }
};
</script>
