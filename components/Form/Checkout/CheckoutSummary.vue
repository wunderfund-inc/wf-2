<template lang="pug">
  section
    b-card(header="Commitment Summary" header-class="text-center")
      b-card-text Hello! My name is #[strong Justin Chiou].
      b-card-text(v-if="validPersonal") I want to personally invest in the #[strong Regulation {{ selectedOffering.offeringType }}] offering of #[strong {{ company.name.short }}].
      b-card-text(v-if="validEntity") I want to invest in the #[strong Regulation {{ selectedOffering.offeringType }}] offering of #[strong {{ company.name.short }}] on behalf of #[strong {{ selectedEntity.name }}].
      b-card-text(v-if="validTransaction") I'm committed to investing #[strong USD] #[strong {{ transactionAmount | asCurrency }}] and paying via #[strong {{ selectedMethod | paymentMethodFormat }}].
      b-card-text(v-if="validAgreementList") #[strong I've agreed to the terms] necessary for this investment to be valid.
      b-button(
        block
        variant="success"
        :disabled="!validEverything"
        @click="submitInvestment"
      ) Commit to Investing
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "user/currentUser",
      company: "company/company",
      selectedType: "checkout/selectedType",
      selectedOffering: "checkout/selectedOffering",
      selectedEntity: "checkout/selectedEntity",
      transactionAmount: "checkout/transactionAmount",
      selectedMethod: "checkout/selectedMethod",
      validAgreementList: "checkout/validAgreementList"
    }),
    validPersonal() {
      return this.selectedType === "PERSONAL" && this.selectedOffering !== null;
    },
    validEntity() {
      return (
        this.selectedType === "ENTITY" &&
        this.selectedOffering &&
        this.selectedEntity
      );
    },
    validTransaction() {
      return this.transactionAmount > 0 && this.selectedMethod !== null;
    },
    validEverything() {
      const validType = this.validPersonal || this.validEntity;
      return validType && this.validTransaction && this.validAgreementList;
    }
  },
  methods: {
    async submitInvestment() {
      await this.$store.dispatch("checkout/submitInvestment", {
        company: this.company,
        user: this.user
      });

      await this.$route.replace("/u");
    }
  }
};
</script>
