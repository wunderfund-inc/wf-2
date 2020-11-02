<template>
  <div class="form-group">
    <label for="address-street-1">Street Address 1</label>
    <input
      id="address-street-1"
      v-model.trim="street1"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    street1: {
      get() {
        return this.$store.state.profile.address_street_1;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "address_street_1",
          val,
        });
      },
    },
  },
};
</script>
