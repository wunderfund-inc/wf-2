<template lang="pug">
  section
    b-row
      b-col
        h6 Select an Offering below:
    b-row.pb-3
      b-col(
        cols="12"
        md="6"
        lg="6"
        v-for="(offering, index) in offerings"
        :key="index"
      )
        offering-card(:offering="offering")
          span(v-if="offering.securityType === 'EQUITY'")
            small.text-muted Price Per Share: {{ offering.equity.pricePerShare | asCurrency }}
            br
            small.text-muted Minimum shares to invest: {{ offering.equity.minSharesNeededToBuy }}
            br
            small.text-muted {{ offering.equity.valuationType }}-money valuation: {{ offering.equity.numberOfSecurities * offering.equity.pricePerShare | asCurrency }}
          span(v-else)
            small.text-muted Minimum Investment: {{ offering.minInvestment | asCurrency }}
            br
            small.text-muted Raising: {{ offering.goal.min | asCurrency }} - {{ offering.goal.max | asCurrency }}
</template>

<script>
import { mapGetters } from "vuex";
import OfferingCard from "@/components/Form/Checkout/OfferingCard";

export default {
  components: { OfferingCard },
  computed: {
    ...mapGetters({ offerings: "company/offerings" })
  }
};
</script>
