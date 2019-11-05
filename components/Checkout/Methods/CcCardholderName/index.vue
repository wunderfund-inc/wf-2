<template lang="pug">
  b-form-group(
    label="Name (as appears on your card)"
    label-for="cc-name"
  )
    b-form-input#cc-name(v-model="ccName")
</template>

<script>
export default {
  computed: {
    ccName: {
      get() {
        return this.$store.getters["checkout/ccCardholderName"];
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_CARDHOLDER_NAME", val);
      }
    }
  }
};
</script>
