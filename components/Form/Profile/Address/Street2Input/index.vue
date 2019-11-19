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
        return this.$store.getters["user/address"].street2;
      },
      set(val) {
        this.$store.commit("user/SET_ADDRESS_ATTRIBUTE", { street2: val });
      }
    }
  }
};
</script>
