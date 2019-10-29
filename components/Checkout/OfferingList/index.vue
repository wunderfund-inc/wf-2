<template lang="pug">
  section.py-3
    b-row
      b-col.py-1(
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
        small.py-2.pl-2.text-muted(v-if="offering !== 'CF'") Why can't I invest?

</template>

<script>
import OfferingCard from "@/components/Checkout/OfferingCard";

export default {
  components: {
    OfferingCard
  },
  computed: {
    offerings() {
      return this.$store.getters["company/offerings"];
    }
  }
};
</script>
