<template lang="pug">
  section
    h3 Invest in Esoteric Brewing Company
    b-form
      offering-list(:offerings="offerings")
      div(v-if="selectedOffering")
        transaction-type
        transaction-amount
        transaction-method
</template>

<script>
import OfferingList from "@/components/Checkout/OfferingList";
import TransactionType from "@/components/Checkout/TransactionType";
import TransactionAmount from "@/components/Checkout/TransactionAmount";
import TransactionMethod from "@/components/Checkout/TransactionMethod";

export default {
  components: {
    OfferingList,
    TransactionType,
    TransactionAmount,
    TransactionMethod
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
