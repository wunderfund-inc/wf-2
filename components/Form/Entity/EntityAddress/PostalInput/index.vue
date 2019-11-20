<template lang="pug">
  b-form-group(
    label="Postal Code"
    label-for="entity-postal"
  )
    b-form-input#entity-postal(v-model="postal" trim)
</template>

<script>
export default {
  computed: {
    postal: {
      get() {
        return this.$store.getters["user/entityForm"].address.postal;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", {
          postal: val
        });
      }
    }
  }
};
</script>
