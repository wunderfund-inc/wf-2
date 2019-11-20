<template lang="pug">
  b-form-group(
    label="Employer Identification Number"
    label-for="entity-ein"
  )
    b-form-input#entity-ein(v-model.number="entityEIN" trim)
</template>

<script>
export default {
  computed: {
    entityEIN: {
      get() {
        return this.$store.getters["user/entityForm"].ein;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", { ein: val });
      }
    },
    validEIN() {
      const reg = /^(0[1-6]||1[0-6]|2[0-7]|[345]\d|[68][0-8]|7[1-7]|9[0-58-9])-?\d{7}$/;
      return reg.test(this.entityEIN);
    }
  }
};
</script>
