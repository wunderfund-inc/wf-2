<template lang="pug">
  b-form-group(label="I would like to invest via:")
    b-form-radio(
      v-for="(method, index) in availablePaymentMethods"
      :key="index"
      :value="method"
      v-model="selectedMethod"
      name="selected-method"
    ) {{ method | properCase }}
</template>

<script>
export default {
  computed: {
    selectedMethod: {
      get() {
        return this.$store.getters["checkout/selectedPaymentMethod"];
      },
      set(val) {
        this.$store.commit("checkout/SET_PAYMENT_METHOD", val);
      }
    },
    availablePaymentMethods() {
      return this.$store.getters["offering/availablePaymentMethods"];
    }
  }
};
</script>
