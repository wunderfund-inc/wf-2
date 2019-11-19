<template lang="pug">
  b-form-group(
    label="First Name"
    label-for="profile-first-name"
  )
    b-form-input#profile-first-name(v-model="firstName" trim)
</template>

<script>
export default {
  computed: {
    firstName: {
      get() {
        return this.$store.getters["user/personal"].firstName;
      },
      set(val) {
        this.$store.commit("user/SET_PERSONAL_ATTRIBUTE", { firstName: val });
      }
    }
  }
};
</script>
