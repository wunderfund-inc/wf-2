<template lang="pug">
  b-form-group(
    label="Estimated Net Assets"
    label-for="entity-net-assets"
  )
    b-form-input#entity-net-assets(v-model.number="netAssets" trim)
</template>

<script>
export default {
  computed: {
    netAssets: {
      get() {
        return this.$store.getters["user/entityForm"].netAssets;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          netAssets: val
        });
      }
    }
  }
};
</script>
