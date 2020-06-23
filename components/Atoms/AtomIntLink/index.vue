<template>
  <nuxt-link :to="to">{{ text }}</nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>
