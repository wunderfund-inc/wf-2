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
        return this.$store.getters["user/address"].street1;
      },
      set(val) {
        this.$store.commit("user/SET_ADDRESS_ATTRIBUTE", { street1: val });
      }
    }
  }
};
</script>
