<template>
  <b-form-group
    label="Finally, can you tell us your main reason for investing in this company?"
    label-for="testimonial"
  >
    <b-form-textarea
      id="testimonial"
      v-model="testimonial"
      placeholder="Enter your text here"
    />
  </b-form-group>
</template>

<script>
export default {
  computed: {
    testimonial: {
      get() {
        return this.$store.getters["checkout/testimonial"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TESTIMONIAL", val);
      }
    }
  }
};
</script>
