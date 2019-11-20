<template lang="pug">
  b-form-group(
    label="Address Street 1"
    label-for="entity-street-1"
  )
    b-form-input#entity-street-1(v-model="street1" trim)
</template>

<script>
export default {
  computed: {
    street1: {
      get() {
        return this.$store.getters["user/entityForm"].address.street1;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", {
          street1: val
        });
      }
    }
  }
};
</script>
