<template>
  <div class="form-group">
    <label for="address-postal">Zip Code</label>
    <input
      id="address-postal"
      v-model.trim="postal"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    postal: {
      get() {
        return this.$store.state.profile.address_postal;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "address_postal",
          val
        });
      }
    }
  }
};
</script>
