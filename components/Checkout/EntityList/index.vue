<template lang="pug">
  b-form-group(v-if="selectedType")
    label Which Entity?
    b-form-select(v-model="selectedEntity" :options="entities")
      template(v-slot:first)
        option(:value="null" disabled) Please select an Entity
</template>

<script>
export default {
  computed: {
    entities() {
      return this.$store.getters["user/entities"];
    },
    selectedEntity: {
      get() {
        return this.$store.getters["checkout/selectedEntity"];
      },
      set(val) {
        this.$store.commit("checkout/SET_ENTITY", val);
      }
    },
    selectedType() {
      return this.$store.getters["checkout/selectedType"] === "ENTITY";
    }
  }
};
</script>
