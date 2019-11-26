<template lang="pug">
  b-form-group(
    label="Security Code"
    label-for="cc-cvv"
  )
    b-form-input#cc-cvv(v-model="ccCVV")
</template>

<script>
export default {
  computed: {
    ccCVV: {
      get() {
        return this.$store.getters["checkout/cc"].cvv;
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_ATTRIBUTE", { cvv: val });
      }
    }
  }
};
</script>
