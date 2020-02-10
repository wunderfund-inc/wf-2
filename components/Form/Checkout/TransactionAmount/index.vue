<template lang="pug">
  b-form-group(
    label="Amount You Wish to Commit (USD $)"
    label-for="inv-amt"
    :state="validAmount"
  )
    b-form-input#inv-amt.form-control(
      v-model.number="transactionAmount"
      aria-describedby="text-amount"
      :state="validAmount"
    )
    b-form-text(
      v-if="validAmount === null || !validAmount"
      id="text-amount"
      :text-variant="(validAmount === null) ? `muted` : `danger`"
    )
      span(
        :class="(validAmount || validAmount === null) ? `` : `font-weight-bold`"
      ) Your commitment to invest needs to be at least {{ minInvestment | asCurrency }}
      |
      |
      span(
        v-if="selectedOffering.securityType === 'EQUITY'"
        :class="(validAmount || validAmount === null) ? `` : `font-weight-bold`"
      ) ({{ selectedOffering.equity.minSharesNeededToBuy }} shares at {{ selectedOffering.equity.pricePerShare | asCurrency }}/share)
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      company: "company/company",
      offerings: "company/offerings",
      selectedOffering: "checkout/selectedOffering"
    }),
    minInvestment() {
      const securityType = this.selectedOffering.securityType;
      const minSharesToBuy = this.selectedOffering.equity.minSharesNeededToBuy;
      const pricePerShare = this.selectedOffering.equity.pricePerShare;
      const minInvestmentAmount = this.selectedOffering.minInvestment;
      return securityType === "EQUITY"
        ? minSharesToBuy * pricePerShare
        : minInvestmentAmount;
    },
    validAmount() {
      if (this.transactionAmount === null) return null;
      return this.transactionAmount >= this.minInvestment;
    },
    transactionAmount: {
      get() {
        return this.$store.getters["checkout/transactionAmount"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TRANSACTION_AMOUNT", val);
      }
    }
  }
};
</script>
