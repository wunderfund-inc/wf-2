<template>
  <section
    :style="`background-color: ${bgColor}`"
    class="cancellation bg-custom d-print-none"
  >
    <div class="container py-5 text-light">
      <h2 class="text-center pb-3">Test the Waters Policy</h2>
      <ol>
        <li>
          No money or other consideration is being solicited, and if sent in
          response, will not be accepted.
        </li>
        <li>
          No offer to buy the securities can be accepted and no part of the
          purchase price can be received until the offering statement is filed
          and only through the Wunderfund platform.
        </li>
        <li class="mb-0">
          Your indication of interest involves no obligation or commitment of
          any kind.
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
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

<style lang="scss" scoped>
.bg-custom {
  filter: brightness(1.2);
}
</style>
