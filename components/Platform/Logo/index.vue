<template>
  <nuxt-link to="/">
    <img :src="platformImgSrc" :alt="platform" width="200" />
  </nuxt-link>
</template>

<script>
export default {
  name: "PlatformLogo",
  computed: {
    platform() {
      return this.$config.PLATFORM;
    },
    platformImgSrc() {
      if (this.platform && this.platform !== "TEST") {
        return require(`@/assets/platform/${this.platform.toLowerCase()}/logo.png`);
      }
      return null;
    },
  },
};
</script>
