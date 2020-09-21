<template>
  <span>{{ title }}</span>
</template>

<script>
const platform = process.env.PLATFORM;

export default {
  computed: {
    title() {
      switch (platform) {
        case "WFP":
          return "Wunderfund.co";
        case "WFH":
          return "Wunderfund Health";
        default:
          return "TEST";
      }
    }
  }
};
</script>
