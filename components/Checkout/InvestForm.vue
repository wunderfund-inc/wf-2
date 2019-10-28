<template lang="pug">
  section
    h3.pb-3 Invest in Esoteric Brewing Company
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
      return ["CF", "D", "A"];
    }
  }
};
</script>
