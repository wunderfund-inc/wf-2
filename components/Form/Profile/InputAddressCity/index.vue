<template>
  <div class="form-group">
    <label for="address-city">City</label>
    <input
      id="address-city"
      v-model.trim="city"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    city: {
      get() {
        return this.$store.state.profile.address_city;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "address_city",
          val
        });
      }
    }
  }
};
</script>
