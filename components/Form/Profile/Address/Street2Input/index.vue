<template lang="pug">
  b-form-group(
    label="Street Address 2"
    label-for="profile-street-2"
  )
    b-form-input#profile-street-2(v-model="street2" trim)
</template>

<script>
export default {
  computed: {
    street2: {
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
