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
      div(v-if="selectedOfferingSet")
        b-row
          b-col
            transaction-amount
        b-row
          b-col
            transaction-method
            method-layout
        b-row
          b-col
            transaction-agreements
</template>

<script>
import { mapGetters } from "vuex";
import TransactionType from "@/components/Form/Checkout/TransactionType";
import EntityList from "@/components/Form/Checkout/EntityList";
import OfferingList from "@/components/Form/Checkout/OfferingList";
import TransactionAmount from "@/components/Form/Checkout/TransactionAmount";
import TransactionMethod from "@/components/Form/Checkout/TransactionMethod";
import MethodLayout from "@/components/Checkout/Methods/MethodLayout";
import TransactionAgreements from "@/components/Form/Checkout/TransactionAgreements";

export default {
  components: {
    TransactionType,
    EntityList,
    OfferingList,
    TransactionAmount,
    TransactionMethod,
    MethodLayout,
    TransactionAgreements
  },
  computed: {
    ...mapGetters({
      selectedType: "checkout/selectedType",
      selectedEntity: "checkout/selectedEntity",
      selectedOffering: "checkout/selectedOffering"
    }),
    selectedTypeSet() {
      return (
        this.selectedType === "PERSONAL" ||
        (this.selectedType === "ENTITY" && this.selectedEntity)
      );
    },
    selectedOfferingSet() {
      return ["CF", "A", "D"].includes(this.selectedOffering);
    }
  }
};
</script>
