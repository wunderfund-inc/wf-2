<template>
  <nuxt-link to="/">
    <img :src="platformImgSrc" :alt="platform" width="200" />
  </nuxt-link>
</template>

<script>
export default {
  computed: {
    platform() {
      return process.env.PLATFORM;
    },
    platformImgSrc() {
      if (this.platform) {
        return require(`@/assets/platform/${this.platform.toLowerCase()}/logo.png`);
      }
      return null;
    }
  }
};
</script>
