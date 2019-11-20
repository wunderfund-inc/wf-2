<template lang="pug">
  b-form-group(
    label="State"
    label-for="entity-state"
  )
    b-form-input#entity-state(v-model="state" trim)
</template>

<script>
export default {
  computed: {
    state: {
      get() {
        return this.$store.getters["user/entityForm"].address.state;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", { state: val });
      }
    }
  }
};
</script>
