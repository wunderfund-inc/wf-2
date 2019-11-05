<template lang="pug">
  b-card(bg-variant="light" v-if="extraInfoNeeded")
    b-form-group(
      label="Extra Information Needed!"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      section(v-if="needsAchInfo")
        b-row
          b-col
            ach-account-number
          b-col
            ach-routing-number
      section(v-if="needsCCInfo")
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
      section(v-if="needsCryptoInfo")
        b-row
          b-col
            crypto-address
</template>

<script>
import AchAccountNumber from "@/components/Checkout/Methods/AchAccountNumber";
import AchRoutingNumber from "@/components/Checkout/Methods/AchRoutingNumber";
import CcCardholderName from "@/components/Checkout/Methods/CcCardholderName";
import CcCardNumber from "@/components/Checkout/Methods/CcCardNumber";
import CcExpiryMonth from "@/components/Checkout/Methods/CcExpiryMonth";
import CcExpiryYear from "@/components/Checkout/Methods/CcExpiryYear";
import CcCvv from "@/components/Checkout/Methods/CcCvv";
import CryptoAddress from "@/components/Checkout/Methods/CryptoAddress";

export default {
  components: {
    AchAccountNumber,
    AchRoutingNumber,
    CcCardholderName,
    CcCardNumber,
    CcExpiryMonth,
    CcExpiryYear,
    CcCvv,
    CryptoAddress
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
