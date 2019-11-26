<template lang="pug">
  section
    h3 Invest in Esoteric Brewing
    b-form(@submit.stop.prevent)
      b-row
        b-col
          transaction-type
      b-row(v-if="selectedType === 'ENTITY'")
        b-col
          entity-list
      offering-list(v-if="selectedTypeSet")
</template>

<script>
import TransactionType from "@/components/Checkout/TransactionType";
import EntityList from "@/components/Checkout/EntityList";
import OfferingList from "@/components/Form/Checkout/OfferingList";

export default {
  components: {
    TransactionType,
    EntityList,
    OfferingList
  },
  computed: {
    selectedType() {
      return this.$store.getters["checkout/selectedType"];
    },
    selectedTypeSet() {
      const selectedType = this.$store.getters["checkout/selectedType"];
      const selectedEntity = this.$store.getters["checkout/selectedEntity"];
      return (
        selectedType === "PERSONAL" ||
        (selectedType === "ENTITY" && selectedEntity)
      );
    }
  }
};
</script>
