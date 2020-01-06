<template lang="pug">
  b-form-group(
    label="Last Name"
    label-for="profile-last-name"
  )
    b-form-input#profile-last-name(v-model="lastName" trim)
</template>

<script>
export default {
  computed: {
    lastName: {
      get() {
        return this.$store.getters["user/name"].last;
      },
      set(val) {
        this.$store.dispatch("user/setProfileNameAttribute", { last: val });
      }
    }
  }
};
</script>
