<template lang="pug">
  b-form-group(
    :label="securityType === 'EQUITY' ? 'Number of Shares You Wish to Purchase' : 'Amount You Wish to Commit (USD $)'"
    label-for="inv-amt"
  )
    div(v-if="securityType === 'EQUITY'")
      b-form-input(
        v-model.number="selectedShares"
        type="number"
      )
      b-form-text(:text-variant="validShares ? `muted` : `danger`")
        span(:class="validShares ? `` : `font-weight-bold`") Your commitment to invest in this offering needs to be at minimum {{ selectedOffering.equity.minSharesNeededToBuy }} shares ({{ selectedOffering.equity.minSharesNeededToBuy }} shares at {{ selectedOffering.equity.pricePerShare | asCurrency }}/share will be {{ minInvestment | asCurrency }})
    div(v-else)
      money.form-control(
        v-model="selectedAmount"
        v-bind="moneyConfig"
      )
      b-form-text(:text-variant="validAmount ? `muted` : `danger`")
        span(:class="validAmount ? `` : `font-weight-bold`") - Your commitment to invest needs to be at least {{ minInvestment | asCurrency }}.
        br
        span(:class="validAmount ? `` : `font-weight-bold`") - The maximum amount you're allowed to invest at this time is {{ spendPool.current | asCurrency }}.
</template>

<script>
import { Money } from "v-money";
import { mapGetters } from "vuex";

export default {
  components: { Money },
  data() {
    return {
      moneyConfig: {
        decimal: ".",
        thousands: ",",
        prefix: "USD $",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  computed: {
    ...mapGetters({
      company: "company/company",
      offerings: "company/offerings",
      selectedOffering: "checkout/selectedOffering",
      spendPool: "user/spendPool"
    }),
    securityType() {
      return this.selectedOffering.securityType;
    },
    minInvestment() {
      const minSharesToBuy = this.selectedOffering.equity.minSharesNeededToBuy;
      const pricePerShare = this.selectedOffering.equity.pricePerShare;
      const minInvestmentAmount = this.selectedOffering.minInvestment;

      return this.securityType === "EQUITY"
        ? minSharesToBuy * pricePerShare
        : minInvestmentAmount;
    },
    validAmount() {
      return this.selectedAmount >= this.minInvestment;
    },
    validShares() {
      return (
        this.selectedShares >= this.selectedOffering.equity.minSharesNeededToBuy
      );
    },
    selectedAmount: {
      get() {
        return this.$store.getters["checkout/selectedAmount"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TRANSACTION_AMOUNT", val);
      }
    },
    selectedShares: {
      get() {
        return this.$store.getters["checkout/selectedShares"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TRANSACTION_SHARES", val);
      }
    }
  }
};
</script>
