<template lang="pug">
  section
    b-row
      b-col
        h6 Select an Offering below:
    b-row.pb-3
      b-col(
        cols="12"
        md="6"
        lg="4"
        v-for="(offering, index) in offerings"
        :key="index"
      )
        offering-card(:offering="offering")
          span(v-if="offering === 'CF'")
            small.text-muted Minimum Investment: $20
            br
            small.text-muted Raising: $10k - $107k
          span(v-if="offering === 'D'")
            small.text-muted Minimum Investment: $25k
            br
            small.text-muted Raising: $10M
          span(v-if="offering === 'A'")
            small.text-muted Price Per Share: $20
            br
            small.text-muted Post-Money Valuation: $4M
</template>

<script>
import OfferingCard from "@/components/Form/Checkout/OfferingCard";

export default {
  components: { OfferingCard },
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
