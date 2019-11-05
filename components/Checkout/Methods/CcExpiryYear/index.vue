<template lang="pug">
  b-form-group(label="Expiration Year")
    b-form-select(v-model="ccExpiryYear" :options="years")
      template(v-slot:first)
        option(:value="null" disabled) -- Please Select --
</template>

<script>
export default {
  computed: {
    years() {
      const yearList = [];
      const thisYear = new Date().getFullYear();

      for (let index = thisYear; index < thisYear + 11; index++) {
        yearList.push({ value: index - 2000, text: index });
      }

      return yearList;
    },
    ccExpiryYear: {
      get() {
        return this.$store.getters["checkout/ccExpiryYear"];
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_EXPIRY_YEAR", val);
      }
    }
  }
};
</script>
