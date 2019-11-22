<template lang="pug">
  b-form-group(
    label="What kind of Entity is this?"
  )
    b-form-select(
      v-model="entityType"
      :options="options"
    )
</template>
<script>
export default {
  data() {
    return {
      options: [
        { value: null, text: "--Select One--", disabled: true },
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
        return this.$store.getters["user/entityForm"].type;
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
