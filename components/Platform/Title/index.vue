<template>
  <span>{{ title }}</span>
</template>

<script>
export default {
  name: "PlatformTitle",
  computed: {
    title() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "Wunderfund.co";
        case "WFH":
          return "Wunderfund Health";
        default:
          return "TEST";
      }
    },
  },
};
</script>
