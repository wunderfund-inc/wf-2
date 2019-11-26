<template lang="pug">
  section
    h3 Invest in Esoteric Brewing
    b-form
      b-row
        b-col
          transaction-type
      b-row(v-if="selectedType === 'ENTITY'")
        b-col
          entity-list
      offering-list(:offerings="offerings")
      //- b-row
      //-   b-col
      //-     transaction-amount
      //- b-row
      //-   b-col
      //-     transaction-method
      //-     method-layout
      //- b-row
      //-   b-col
      //-     transaction-agreements
</template>

<script>
import OfferingList from "@/components/Checkout/OfferingList";
import TransactionType from "@/components/Checkout/TransactionType";
import EntityList from "@/components/Checkout/EntityList";
import TransactionAmount from "@/components/Checkout/TransactionAmount";
import TransactionMethod from "@/components/Checkout/TransactionMethod";
import MethodLayout from "@/components/Checkout/Methods/MethodLayout";
import TransactionAgreements from "@/components/Checkout/TransactionAgreements";

export default {
  components: {
    OfferingList,
    TransactionType,
    EntityList,
    TransactionAmount,
    TransactionMethod,
    MethodLayout,
    TransactionAgreements
  },
  computed: {
    offerings() {
      return this.$store.getters["company/offerings"];
    },
    selectedOffering() {
      return this.$store.getters["checkout/selectedOffering"];
    },
    selectedType() {
      return this.$store.getters["checkout/selectedType"];
    }
  }
};
</script>
