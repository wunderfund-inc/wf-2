<template lang="pug">
  b-form-group(label="State")
    b-form-select(v-model="state" :options="states")
      template(v-slot:first)
        option(:value="null" disabled) -- Please Select --
</template>

<script>
import states from "@/components/Form/states";

export default {
  data() {
    return {
      states: states
    };
  },
  computed: {
    state: {
      get() {
        return this.$store.getters["user/entityForm"].address.state;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_ADDRESS_ATTRIBUTE", { state: val });
      }
    }
  }
};
</script>
