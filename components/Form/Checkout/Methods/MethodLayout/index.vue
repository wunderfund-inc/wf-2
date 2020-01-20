<template lang="pug">
  b-card.my-3(bg-variant="light" v-if="selectedMethod")
    b-form-group(
      label="Extra Information"
      label-size="lg"
      label-class="font-weight-bold pt-0 mb-4"
    )
      section(v-if="selectedMethod === 'ACH'")
        b-row
          b-col
            ach-account-number
          b-col
            ach-routing-number
        b-row
          b-col
            b-img(src="~assets/logo/tapi_secure.png")
      section(v-if="selectedMethod === 'CHECK'")
        p We will email you details for sending a check.
      section(v-if="selectedMethod === 'WIRE'")
        p We will email you details for sending a wire transfer.
      section(v-if="selectedMethod === 'CC'")
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
          b-col
            cc-cvv
        b-row
          b-col
            b-img(src="~assets/logo/tapi_secure.png")
      section(v-if="selectedMethod === 'CRYPTO'")
        b-row
          b-col
            crypto-address
        b-row
          b-col
            b-img(src="~assets/logo/tapi_secure.png")
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
