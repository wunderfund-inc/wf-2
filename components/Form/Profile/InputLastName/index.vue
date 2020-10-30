<template>
  <div class="form-group">
    <label for="last-name">Last Name</label>
    <input
      id="last-name"
      v-model.trim="lastName"
      type="text"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  computed: {
    lastName: {
      get() {
        return this.$store.state.profile.last_name;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "last_name",
          val,
        });
      },
    },
  },
};
</script>
