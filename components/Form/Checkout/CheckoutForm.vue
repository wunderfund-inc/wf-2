<template lang="pug">
  section
    h3 Invest in {{ company.name.short }}
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
        b-row
          b-col
            testimonial-input
</template>

<script>
import { mapGetters } from "vuex";
import TransactionType from "@/components/Form/Checkout/TransactionType";
import EntityList from "@/components/Form/Checkout/EntityList";
import OfferingList from "@/components/Form/Checkout/OfferingList";
import TransactionAmount from "@/components/Form/Checkout/TransactionAmount";
import TransactionMethod from "@/components/Form/Checkout/TransactionMethod";
import MethodLayout from "@/components/Form/Checkout/Methods/MethodLayout";
import TransactionAgreements from "@/components/Form/Checkout/TransactionAgreements";
import TestimonialInput from "@/components/Form/Checkout/TestimonialInput";

export default {
  components: {
    TransactionType,
    EntityList,
    OfferingList,
    TransactionAmount,
    TransactionMethod,
    MethodLayout,
    TransactionAgreements,
    TestimonialInput
  },
  computed: {
    ...mapGetters({
      company: "company/company",
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
      return this.selectedOffering;
    }
  }
};
</script>
