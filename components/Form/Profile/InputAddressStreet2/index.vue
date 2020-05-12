<template>
  <div class="form-group">
    <label for="address-street-2">Street Address 2</label>
    <input
      id="address-street-2"
      v-model.trim="street2"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    street2: {
      get() {
        return this.$store.state.profile.address_street_2;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "address_street_2",
          val
        });
      }
    }
  }
};
</script>
