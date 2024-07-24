<template>
  <section class="bg-custom" :style="`background-color: ${bgColor}`">
    <div class="container p-5">
      <div class="row justify-content-center">
        <h1 class="text-light pb-3">See who's invested so far:</h1>
      </div>
      <div class="row justify-content-center">
        <google-map
          :company-location="companyLocation"
          :locations="locations"
          style="height: 400px; width: 1100px"
        />
      </div>
    </div>
  </section>
</template>

<script>
import GoogleMap from "@/components/Campaign/GoogleMap";

export default {
  components: { GoogleMap },
  props: {
    companyLocation: {
      type: Object,
      default() {},
      required: true,
    },
    locations: {
      type: Array,
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
  filter: brightness(1.4);
}
</style>
