<template lang="pug">
  b-form-group(label="Bank Routing Number" label-for="ach-routing")
    b-form-input#ach-routing(v-model="achRoutingNumber")
</template>

<script>
export default {
  computed: {
    achRoutingNumber: {
      get() {
        return this.$store.getters["checkout/achRoutingNumber"];
      },
      set(val) {
        this.$store.commit("checkout/SET_ACH_ROUTING_NUMBER", val);
      }
    }
  }
};
</script>
