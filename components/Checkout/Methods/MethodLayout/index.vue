<template lang="pug">
  b-card(bg-variant="light" v-if="extraInfoNeeded")
    b-form-group(
      v-if="needsAchInfo"
      label="Extra Information Needed!"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      b-row
        b-col
          ach-account-number
        b-col
          ach-routing-number
    b-form-group(
      v-if="needsCCInfo"
      label="Extra Information Needed!"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      b-row
        b-col
          cc-cardholder-name
      b-row
        b-col
          cc-card-number
      b-row
        b-col
          cc-expiry-month
        b-col
          cc-expiry-year
      b-row
        b-col
          cc-cvv
        b-col
        b-col
    b-form-group(
      v-if="needsCryptoInfo"
      label="Extra Information Needed!"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      b-form-input(placeholder="ethereum address")
</template>

<script>
import AchAccountNumber from "@/components/Checkout/Methods/AchAccountNumber";
import AchRoutingNumber from "@/components/Checkout/Methods/AchRoutingNumber";
import CcCardholderName from "@/components/Checkout/Methods/CcCardholderName";
import CcCardNumber from "@/components/Checkout/Methods/CcCardNumber";
import CcExpiryMonth from "@/components/Checkout/Methods/CcExpiryMonth";
import CcExpiryYear from "@/components/Checkout/Methods/CcExpiryYear";
import CcCvv from "@/components/Checkout/Methods/CcCvv";

export default {
  components: {
    AchAccountNumber,
    AchRoutingNumber,
    CcCardholderName,
    CcCardNumber,
    CcExpiryMonth,
    CcExpiryYear,
    CcCvv
  },
  computed: {
    selectedMethod() {
      return this.$store.getters["checkout/selectedMethod"];
    },
    extraInfoNeeded() {
      return ["ACH", "CC", "CRYPTO"].includes(this.selectedMethod);
    },
    needsAchInfo() {
      return this.selectedMethod === "ACH";
    },
    needsCCInfo() {
      return this.selectedMethod === "CC";
    },
    needsCryptoInfo() {
      return this.selectedMethod === "CRYPTO";
    }
  }
};
</script>
