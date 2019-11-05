<template lang="pug">
  b-form-group(label="Ethereum Address" label-for="crypto-address")
    b-form-input#crypto-address(v-model="cryptoAddress")
</template>

<script>
export default {
  computed: {
    cryptoAddress: {
      get() {
        return this.$store.getters["checkout/cryptoAddress"];
      },
      set(val) {
        this.$store.commit("checkout/SET_CRYPTO_ADDRESS", val);
      }
    }
  }
};
</script>
