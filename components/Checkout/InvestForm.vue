<template lang="pug">
  section
    h3 Invest in Esoteric Brewing Company
    b-form
      offering-list(:offerings="offerings")
      transaction-amount(v-if="selectedOffering")
</template>

<script>
import OfferingList from "@/components/Checkout/OfferingList";
import TransactionAmount from "@/components/Checkout/TransactionAmount";

export default {
  components: {
    OfferingList,
    TransactionAmount
  },
  computed: {
    offerings() {
      return this.$store.getters["company/offerings"];
    },
    selectedOffering() {
      return this.$store.getters["checkout/selectedOffering"];
    }
  }
};
</script>
