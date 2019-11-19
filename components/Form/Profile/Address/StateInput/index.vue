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
        return this.$store.getters["user/address"].state;
      },
      set(val) {
        this.$store.commit("user/SET_ADDRESS_ATTRIBUTE", { state: val });
      }
    }
  }
};
</script>
