<template lang="pug">
  b-form-group(label="State")
    b-form-select(v-model="state" :options="states")
      template(v-slot:first)
        option(:value="null" disabled) -- Please Select --
</template>

<script>
import d from "@/components/Form/data.json";

export default {
  data() {
    return {
      states: d.states
    };
  },
  computed: {
    state: {
      get() {
        return this.$store.getters["user/address"].state;
      },
      set(val) {
        this.$store.dispatch("user/setProfileAddressAttribute", { state: val });
      }
    }
  }
};
</script>
