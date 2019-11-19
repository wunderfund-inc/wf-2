<template lang="pug">
  b-form-group(
    label="City"
    label-for="profile-city"
  )
    b-form-input#profile-city(v-model="city" trim)
</template>

<script>
export default {
  computed: {
    city: {
      get() {
        return this.$store.getters["user/address"].city;
      },
      set(val) {
        this.$store.commit("user/SET_ADDRESS_ATTRIBUTE", { city: val });
      }
    }
  }
};
</script>
