<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col(md="8")
          invest-form
        b-col(md="4")
          invest-summary
</template>

<script>
import InvestForm from "@/components/Form/Checkout/CheckoutForm";
import InvestSummary from "@/components/Checkout/InvestSummary";

export default {
  components: {
    InvestForm,
    InvestSummary
  },
  async fetch({ store }) {
    await store.dispatch("company/GET_OFFERINGS");
  }
};
</script>
