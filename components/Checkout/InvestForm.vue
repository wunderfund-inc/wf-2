<template lang="pug">
  section
    h3 Invest in Esoteric Brewing Company
    b-form
      offering-list(:offerings="offerings")
</template>

<script>
import OfferingList from "@/components/Checkout/OfferingList";

export default {
  components: {
    OfferingList
  },
  computed: {
    offerings() {
      return this.$store.getters["company/offerings"];
    }
  }
};
</script>
