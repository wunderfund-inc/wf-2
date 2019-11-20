<template lang="pug">
  b-form-group(
    label="City"
    label-for="entity-city"
  )
    b-form-input#entity-city(v-model="city" trim)
</template>

<script>
export default {
  computed: {
    city: {
      get() {
        return this.$store.getters["user/entityForm"].address.city;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", { city: val });
      }
    }
  }
};
</script>
