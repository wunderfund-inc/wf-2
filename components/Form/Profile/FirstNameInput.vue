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
        return this.$store.getters["user/name"].first;
      },
      set(val) {
        this.$store.dispatch("user/setProfileNameAttribute", { first: val });
      }
    }
  }
};
</script>
