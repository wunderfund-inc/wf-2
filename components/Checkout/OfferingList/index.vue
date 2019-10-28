<template lang="pug">
  section
    b-row
      b-col(
        cols="12"
        md="6"
        lg="4"
        v-for="(choice, index) in offeringChoices"
        :key="index"
      )
        offering-card(:offering="choice")
          span(v-if="choice === 'CF'")
            small.text-muted Minimum Investment: $20
            br
            small.text-muted Raising: $10k - $107k
          span(v-if="choice === 'D'")
            small.text-muted Minimum Investment: $25k
            br
            small.text-muted Raising: $10M
          span(v-if="choice === 'A'")
            small.text-muted Price Per Share: $20
            br
            small.text-muted Post-Money Valuation: $4M
</template>

<script>
import OfferingCard from "@/components/Checkout/OfferingCard";

export default {
  components: {
    OfferingCard
  },
  computed: {
    offeringChoices() {
      return ["CF", "D", "A"];
    }
  }
};
</script>
