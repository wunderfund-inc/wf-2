<template lang="pug">
  b-form-group(
    label="State"
    label-for="profile-state"
  )
    b-form-input#profile-state(v-model="state" trim)
</template>

<script>
export default {
  computed: {
    state: {
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
