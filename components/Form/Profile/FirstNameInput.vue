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
        return null;
      },
      set(val) {
        return val;
      }
    }
  }
};
</script>
