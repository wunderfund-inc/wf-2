<template lang="pug">
  b-form-group(
    label="Card Number (no spaces nor dashes)"
    label-for="cc-number"
  )
    b-form-input#cc-number(v-model.number="ccNumber")
</template>

<script>
export default {
  computed: {
    ccNumber: {
      get() {
        return this.$store.getters["checkout/cc"].number;
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_ATTRIBUTE", { number: val });
      }
    }
  }
};
</script>
