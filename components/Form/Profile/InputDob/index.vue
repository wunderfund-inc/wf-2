<template>
  <div class="form-group">
    <label for="dob">Date of Birth</label>
    <input id="dob" v-model="dob" type="date" class="form-control" />
  </div>
</template>

<script>
export default {
  computed: {
    dob: {
      get() {
        return this.$store.state.profile.dob;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "dob",
          val,
        });
      },
    },
  },
};
</script>
