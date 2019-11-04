<template lang="pug">
  b-form-group(label="Bank Account Number" label-for="ach-account")
    b-form-input#ach-account(v-model="achAccountNumber")
</template>

<script>
export default {
  computed: {
    achAccountNumber: {
      get() {
        return this.$store.getters["checkout/achAccountNumber"];
      },
      set(val) {
        this.$store.commit("checkout/SET_ACH_ACCOUNT_NUMBER", val);
      }
    }
  }
};
</script>
