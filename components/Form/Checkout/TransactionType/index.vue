<template lang="pug">
  b-form-group(label="I'd like to invest...")
    b-form-radio(
      value="PERSONAL"
      v-model="selectedType"
      name="selected-type"
    ) Personally.
    b-form-radio(
      value="ENTITY"
      v-model="selectedType"
      name="selected-type"
      :disabled="!hasEntities"
    ) On behalf an Entity.
      br(v-if="!hasEntities")
      small.text-muted(v-if="!hasEntities") You don't have any entities filed.
        |
        |
        b-link Create one here!
</template>

<script>
export default {
  computed: {
    selectedType: {
      get() {
        return this.$store.getters["checkout/selectedType"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TRANSACTION_TYPE", val);
      }
    },
    hasEntities() {
      return this.$store.getters["user/hasEntities"];
    }
  }
};
</script>
