<template lang="pug">
  b-form-group(
    label="Name (as it appears on your card)"
    label-for="cc-name"
  )
    b-form-input#cc-name(v-model="ccName")
</template>

<script>
export default {
  computed: {
    ccName: {
      get() {
        return this.$store.getters["checkout/cc"].name;
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_ATTRIBUTE", { name: val });
      }
    }
  }
};
</script>
