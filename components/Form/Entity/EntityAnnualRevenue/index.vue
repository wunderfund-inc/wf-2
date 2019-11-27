<template lang="pug">
  b-form-group(
    label="Estimated Annual Revenue"
    label-for="entity-annual-revenue"
  )
    b-form-input#entity-annual-revenue(v-model.number="annualRevenue" trim)
</template>

<script>
export default {
  computed: {
    annualRevenue: {
      get() {
        return this.$store.getters["user/entityForm"].annualRevenue;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          annualRevenue: val
        });
      }
    }
  }
};
</script>
