<template>
  <b-form-group label="Name of the Entity" label-for="entity-name">
    <b-form-input id="entity-name" v-model="entityName" trim />
  </b-form-group>
</template>

<script>
export default {
  computed: {
    entityName: {
      get() {
        return this.$store.state.profile.entity_name;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "entity_name",
          val
        });
      }
    }
  }
};
</script>
