<template lang="pug">
  b-form-group
    b-form-checkbox.py-2(v-model="differentEmail" switch) I want to use a different email address (other than #[span.text-success {{ accountEmail }}]) when signing agreements on behalf of this entity.
</template>

<script>
export default {
  computed: {
    differentEmail: {
      get() {
        return this.$store.getters["user/entityForm"].differentEmail;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          differentEmail: val
        });
      }
    },
    accountEmail() {
      // TODO: Refax eventually to store data
      return this.$store.getters["auth/currentUserAuth"].email;
    }
  }
};
</script>
