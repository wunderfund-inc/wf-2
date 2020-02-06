<template lang="pug">
  b-form-group
    b-form-checkbox.py-2(v-model="nonSpecific" switch) This Entity was #[strong not] specifically created for the sole purpose of investing on this platform.
</template>

<script>
export default {
  computed: {
    nonSpecific: {
      get() {
        return this.$store.getters["user/entityForm"].nonSpecific;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          nonSpecific: val
        });
      }
    }
  }
};
</script>
