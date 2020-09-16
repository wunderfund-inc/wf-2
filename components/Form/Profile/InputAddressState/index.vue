<template>
  <b-form-group label="State">
    <b-form-select v-model="state" :options="states">
      <template v-slot:first>
        <option :value="null" disabled>-- Please Select --</option>
      </template>
    </b-form-select>
  </b-form-group>
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
        return this.$store.state.profile.address_state;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "address_state",
          val
        });
      }
    }
  }
};
</script>
