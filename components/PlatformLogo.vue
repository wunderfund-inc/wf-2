<template>
  <nuxt-link to="/">
    <img
      v-if="$config.PLATFORM !== TEST"
      :src="platformImgSrc"
      :alt="platform"
      width="200"
    />
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
        const p = this.platform.toLowerCase();
        return require(`@/assets/platform/${p}/logo.png`).default;
      }
      return null;
    },
  },
};
</script>
