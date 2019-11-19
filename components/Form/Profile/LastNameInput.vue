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
        // return this.$store.getters["user/personal"].lastName;
        return null;
      },
      set(val) {
        this.$store.commit("user/SET_PERSONAL_ATTRIBUTE", { lastName: val });
      }
    }
  }
};
</script>
