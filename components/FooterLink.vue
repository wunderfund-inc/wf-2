<template>
  <span>
    <nuxt-link v-if="onPlatform" :to="link" class="text-light font-weight-bold">
      <span>{{ title }}</span>
    </nuxt-link>
    <a v-else :href="link" target="_blank" class="text-light font-weight-bold">
      <span>{{ title }}</span>
    </a>
  </span>
</template>

<script>
export default {
  name: "FooterLink",
  props: {
    onPlatform: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      default: "/",
    },
    title: {
      type: String,
      default: "Wunderfund.co",
    },
  },
};
</script>
