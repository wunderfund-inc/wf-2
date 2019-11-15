<template lang="pug">
  b-form-group(
    label="Street Address 1"
    label-for="profile-street-1"
  )
    b-form-input#profile-street-1(v-model="street1" trim)
</template>

<script>
export default {
  computed: {
    street1: {
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
