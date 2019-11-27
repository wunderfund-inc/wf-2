<template lang="pug">
  b-form-group
    b-form-checkbox.py-2(v-model="allAccredited" switch) All investors in this Entity are accredited.
</template>

<script>
export default {
  computed: {
    allAccredited: {
      get() {
        return this.$store.getters["user/entityForm"].accredited;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          accredited: val
        });
      }
    }
  }
};
</script>
