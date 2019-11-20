<template lang="pug">
  b-form-group(
    label="Name of the Entity"
    label-for="entity-name"
  )
    b-form-input#entity-name(v-model="entityName" trim)
</template>

<script>
export default {
  computed: {
    entityName: {
      get() {
        return this.$store.getters["user/entityForm"].name;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", { name: val });
      }
    }
  }
};
</script>
