<template lang="pug">
  b-card.my-3(bg-variant="light" v-if="selectedMethod")
    b-form-group(
      label="Extra Information"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      section(v-if="selectedMethod === 'ACH'")
        .row
          .col-12.col-md-6
            ach-account-number
          .col-12.col-md-6
            ach-routing-number
        .row
          .col
            b-img(src="~assets/logo/tapi_secure.png")
      section(v-if="selectedMethod === 'CHECK'")
        p We will email you details for sending a check.
      section(v-if="selectedMethod === 'WIRE'")
        p We will email you details for sending a wire transfer.
      section(v-if="selectedMethod === 'CC'")
        .row
          .col-12
            cc-cardholder-name
        .row
          .col-12
            cc-card-number
        .row
          .col-12.col-md-4
            cc-expiry-month
          .col-12.col-md-4
            cc-expiry-year
          .col-12.col-md-4
            cc-cvv
        .row
          .col-12
            b-img(src="~assets/logo/tapi_secure.png")
      section(v-if="selectedMethod === 'CRYPTO'")
        .row
          .col
            crypto-address
        .row
          .col
            b-img(thumbnail src="~assets/logo/tapi_secure.png")
</template>

<script>
import AchAccountNumber from "@/components/Form/Checkout/Methods/AchAccountNumber";
import AchRoutingNumber from "@/components/Form/Checkout/Methods/AchRoutingNumber";
import CcCardholderName from "@/components/Form/Checkout/Methods/CcCardholderName";
import CcCardNumber from "@/components/Form/Checkout/Methods/CcCardNumber";
import CcExpiryMonth from "@/components/Form/Checkout/Methods/CcExpiryMonth";
import CcExpiryYear from "@/components/Form/Checkout/Methods/CcExpiryYear";
import CcCvv from "@/components/Form/Checkout/Methods/CcCvv";
import CryptoAddress from "@/components/Form/Checkout/Methods/CryptoAddress";

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
    }
  }
};
</script>
