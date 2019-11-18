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
        return null;
      },
      set(val) {
        return val;
      }
    }
  }
};
</script>
