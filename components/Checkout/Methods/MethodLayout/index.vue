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
          p Okey
        b-col
          p Dokey
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

export default {
  components: {
    AchAccountNumber,
    AchRoutingNumber
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
