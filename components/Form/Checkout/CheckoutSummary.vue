<template lang="pug">
  section(style="position: sticky; top: 20px;")
    b-overlay(:show="showOverlay" rounded="sm")
      template(#overlay)
        .text-center
          b-spinner(large variant="secondary")
          p.pt-3 Getting Agreement to sign...
      b-card(header="Commitment Summary" header-class="text-center")
        b-card-text Hello! My name is #[strong {{ user.name.first }} {{ user.name.last }}].
        b-card-text(v-if="validPersonal") I want to personally invest in the #[strong Regulation {{ selectedOffering.offeringType }}] offering of #[strong {{ company.name.short }}].
        b-card-text(v-if="validEntity") I want to invest in the #[strong Regulation {{ selectedOffering.offeringType }}] offering of #[strong {{ company.name.short }}] on behalf of #[strong {{ selectedEntity.name }}].
        b-card-text(v-if="validEquityTransaction") I'm committed to buying #[strong {{ selectedShares }}] shares at {{ selectedOffering.equity.pricePerShare | asCurrency }}/share (USD {{ selectedShares * selectedOffering.equity.pricePerShare | asCurrency }} total) and paying via #[strong {{ selectedMethod | paymentMethodFormat }}].
        b-card-text(v-if="validTransaction") I'm committed to investing #[strong USD {{ selectedAmount | asCurrency }}] and paying via #[strong {{ selectedMethod | paymentMethodFormat }}].
        b-card-text(v-if="validAgreementList") #[strong I've agreed to the terms] necessary for this investment to be valid.
        b-button(
          v-if="!submitting"
          block
          variant="success"
          :disabled="!validEverything"
          @click="submitInvestment"
        )
          span(v-if="!submitting") Commit to Investing
        b-button(
          v-else
          block
          variant="success"
          :disabled="submitting"
        )
          span.spinner-border.spinner-border-sm.mr-2(
            role="status"
            aria-hiden="true"
            style="margin-bottom: 4px"
          )
          span Submitting...
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      submitting: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user/currentUser",
      company: "company/company",
      selectedType: "checkout/selectedType",
      selectedOffering: "checkout/selectedOffering",
      selectedEntity: "checkout/selectedEntity",
      selectedAmount: "checkout/selectedAmount",
      selectedMethod: "checkout/selectedMethod",
      selectedShares: "checkout/selectedShares",
      agreedTo: "checkout/agreedTo",
      validAgreementList: "checkout/validAgreementList",
      agreementUrl: "checkout/agreementUrl",
      testimonial: "checkout/testimonial",
      showOverlay: "showOverlay"
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
      if (this.selectedOffering) {
        return (
          this.selectedOffering.securityType !== "EQUITY" &&
          this.selectedAmount >= this.selectedOffering.minInvestment &&
          this.selectedMethod !== null
        );
      }
      return false;
    },
    validEquityTransaction() {
      if (this.selectedOffering) {
        return (
          this.selectedOffering.securityType === "EQUITY" &&
          this.selectedShares >=
            this.selectedOffering.equity.minSharesNeededToBuy &&
          this.selectedMethod
        );
      }
      return false;
    },
    validEverything() {
      if (this.selectedOffering) {
        const validType = this.validPersonal || this.validEntity;
        const validTransactionAmount =
          this.selectedOffering.securityType === "EQUITY"
            ? this.validEquityTransaction
            : this.validTransaction;
        return validType && validTransactionAmount && this.validAgreementList;
      }
      return false;
    }
  },
  methods: {
    async submitInvestment() {
      try {
        await this.$store.dispatch("toggleOverlay", true);

        const payload = {
          companyId: this.company.uid,
          offeringId: this.selectedOffering.uid,
          userId: this.user.uid,
          entityId:
            this.selectedType === "ENTITY" ? this.selectedEntity.uid : null
        };

        if (this.testimonial) {
          await this.$store.dispatch("checkout/submitTestimonialForReview", {
            companyId: this.company.uid,
            userId: payload.userId
          });
        }

        await this.$store.dispatch("checkout/submitInvestment", payload);

        await window.location.replace(this.agreementUrl);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        await this.$store.dispatch("toggleOverlay", false);
      }
    }
  }
};
</script>
