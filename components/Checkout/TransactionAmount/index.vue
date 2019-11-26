<template lang="pug">
  b-form-group(
    label="Amount You Wish to Commit (USD $)"
    label-for="inv-amt"
  )
    b-form-input#inv-amt.form-control(
      v-model.number="transactionAmount"
      aria-describedby="text-amount"
    )
    b-form-text(
      v-if="validAmount === null || !validAmount"
      id="text-amount"
      :text-variant="(validAmount === null) ? `muted` : `danger`"
    )
      span(
        :class="(validAmount || validAmount === null) ? `` : `font-weight-bold`"
      ) Your commitment to invest needs to be at least {{ minInvestmentAmount | asCurrency }}
</template>

<script>
export default {
  computed: {
    minInvestmentAmount() {
      return this.$store.getters["offering/minimumInvestmentAmount"];
    },
    validAmount() {
      if (this.transactionAmount === null) return null;
      return this.transactionAmount >= this.minInvestmentAmount;
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
