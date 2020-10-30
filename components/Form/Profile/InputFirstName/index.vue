<template>
  <div class="form-group">
    <label for="first-name">First Name</label>
    <input
      id="first-name"
      v-model.trim="firstName"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    firstName: {
      get() {
        return this.$store.state.profile.first_name;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "first_name",
          val,
        });
      },
    },
  },
};
</script>
