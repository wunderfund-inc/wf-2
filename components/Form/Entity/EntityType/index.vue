<template lang="pug">
  b-form-group(label="What kind of Entity is this?")
    b-form-select(v-model="entityType" :options="options")
      template(v-slot:first)
        option(:value="null" disabled) -- Select One --
</template>
<script>
export default {
  data() {
    return {
      options: [
        "Revocable Trust",
        "Irrevocable Trust",
        "Limited Partnership",
        "Limited Liability Company",
        "Corporation"
      ]
    };
  },
  computed: {
    entityType: {
      get() {
        return this.$store.getters["user/entityForm"].classification;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          classification: val
        });
      }
    }
  }
};
</script>
