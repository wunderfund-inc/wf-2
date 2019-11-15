<template lang="pug">
  b-form-group(
    label="Zip Code"
    label-for="profile-postal"
  )
    b-form-input#profile-postal(v-model="postal" trim)
</template>

<script>
export default {
  computed: {
    postal: {
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
