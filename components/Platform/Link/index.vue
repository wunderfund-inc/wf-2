<template>
  <nuxt-link to="/">
    {{ title }}
  </nuxt-link>
</template>

<script>
const platform = process.env.PLATFORM;

export default {
  computed: {
    title() {
      switch (platform) {
        case "WFP":
          return "Wunderfund";
        case "WFH":
          return "Wunderfund Health";
        default:
          return "TEST";
      }
    }
  }
};
</script>
