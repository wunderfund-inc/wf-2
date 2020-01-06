<template lang="pug">
  b-form-group(
    label="Which email address do you want to use instead?"
    label-for="entity-email"
  )
    b-form-input#entity-email(v-model="entityEmail" trim type="email")
</template>

<script>
export default {
  computed: {
    entityEmail: {
      get() {
        return this.$store.getters["user/entityForm"].email;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", { email: val });
      }
    }
  }
};
</script>
