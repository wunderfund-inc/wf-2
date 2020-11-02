<template>
  <b-form-group
    label="*Optional* Would you also be willing to tell us your reason for investing in this company?"
    label-class="font-weight-bold"
    label-for="testimonial"
    class="my-3"
  >
    <b-form-textarea
      id="testimonial"
      v-model="testimonial"
      placeholder="Enter something here"
      rows="4"
      class="mt-md-3"
    />
  </b-form-group>
</template>

<script>
export default {
  computed: {
    testimonial: {
      get() {
        return this.$store.state.agreement.testimonial;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "testimonial",
          val,
        });
      },
    },
  },
};
</script>
