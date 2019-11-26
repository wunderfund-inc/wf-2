<template lang="pug">
  section
    b-card(header="Commitment Summary" header-class="text-center")
      b-card-text Hello! My name is #[strong Justin Chiou].
      b-card-text(v-if="validPersonal") I want to personally invest in the #[strong Regulation] #[strong {{ selectedOffering }}] offering of #[strong Esoteric Brewing].
      b-card-text(v-if="validEntity") I want to invest in the #[strong Regulation] #[strong {{ selectedOffering }}] offering of #[strong Esoteric Brewing] on behalf of #[strong {{ selectedEntity.name }}].
      b-card-text(v-if="validTransaction") I'm committed to investing #[strong USD] #[strong {{ transactionAmount | asCurrency }}] and paying via #[strong {{ selectedMethod | paymentMethodFormat }}].
      b-card-text(v-if="validAgreementList") I've understood and agree to the terms necessary for this investment to be valid.
      b-button(block variant="success" :disabled="validEverything") Invest Now
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      selectedType: "checkout/selectedType",
      selectedOffering: "checkout/selectedOffering",
      selectedEntity: "checkout/selectedEntity",
      transactionAmount: "checkout/transactionAmount",
      selectedMethod: "checkout/selectedMethod",
      validAgreementList: "checkout/validAgreementList"
    }),
    validPersonal() {
      return this.selectedType === "PERSONAL" && this.selectedOffering;
    },
    validEntity() {
      return (
        this.selectedType === "ENTITY" &&
        this.selectedOffering &&
        this.selectedEntity
      );
    },
    validTransaction() {
      return this.transactionAmount > 0 && this.selectedMethod;
    },
    validEverything() {
      const validType = this.validPersonal || this.validEntity;
      return validType && this.validTransaction && this.validAgreementList;
    }
  }
};
</script>
