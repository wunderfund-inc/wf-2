<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col(md="8")
          checkout-form
        b-col(md="4")
          checkout-summary
</template>

<script>
import CheckoutForm from "@/components/Form/Checkout/CheckoutForm";
import CheckoutSummary from "@/components/Form/Checkout/CheckoutSummary";

export default {
  components: {
    CheckoutForm,
    CheckoutSummary
  },
  async fetch({ store }) {
    await store.dispatch("company/GET_OFFERINGS");
  }
};
</script>
