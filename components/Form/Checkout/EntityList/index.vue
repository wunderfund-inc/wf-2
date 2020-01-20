<template lang="pug">
  b-form-group
    label Which Entity?
    b-form-select(v-model="selectedEntity")
      template(v-slot:first)
        option(:value="null" disabled) Please select an Entity
      option(
        v-for="(entity, index) in entities"
        :key="index"
        :value="{ id: entity.uid, name: entity.name }"
      ) {{ entity.name }}
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
    }
  }
};
</script>
