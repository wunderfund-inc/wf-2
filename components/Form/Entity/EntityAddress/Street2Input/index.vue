<template lang="pug">
  b-form-group(
    label="Address Street 2"
    label-for="entity-street-2"
  )
    b-form-input#entity-street-2(v-model="street1" trim)
</template>

<script>
export default {
  computed: {
    street1: {
      get() {
        return this.$store.getters["user/entityForm"].address.street2;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", {
          street2: val
        });
      }
    }
  }
};
</script>
