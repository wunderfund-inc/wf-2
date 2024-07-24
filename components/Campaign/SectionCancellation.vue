<template>
  <section
    :style="`background-color: ${bgColor}`"
    class="cancellation bg-custom d-print-none"
  >
    <div class="container py-5 text-light">
      <h2 class="text-center pb-3">Cancellation Policy</h2>
      <p class="mb-0">
        Like all campaigns on our platform, if
        <strong>{{ companyName }}</strong> does not reach its funding goal, you
        will be notified via email from both Wunderfund and the company and
        receive a full refund for your investment (minus any escrow operation
        fees with said company). For more information, please check out our
        <b-link to="/faq/investor" class="font-weight-bold text-white">
          risks and cancellation information
        </b-link>
        in our FAQ.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true,
    },
  },
  computed: {
    bgColor() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "#003b5a";
        case "WFH":
          return "#007bff";
        default:
          return "#6c757d";
      }
    },
  },
};
</script>

<style scoped>
.bg-custom {
  filter: brightness(1.2);
}
</style>
