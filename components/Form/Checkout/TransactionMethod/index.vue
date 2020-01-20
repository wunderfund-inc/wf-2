<template lang="pug">
  b-form-group(label="I would like to invest via:")
    b-form-radio(
      v-for="(method, index) in availablePaymentMethods"
      :key="index"
      :value="method"
      v-model="selectedMethod"
      name="selected-method"
    ) {{ method | paymentMethodFormat }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      offering: "checkout/selectedOffering"
    }),
    selectedMethod: {
      get() {
        return this.$store.getters["checkout/selectedMethod"];
      },
      set(val) {
        this.$store.commit("checkout/SET_PAYMENT_METHOD", val);
      }
    },
    availablePaymentMethods() {
      return this.offering.paymentMethods;
    }
  }
};
</script>
