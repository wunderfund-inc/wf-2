<template>
  <a :class="linkClasses" :href="url">
    {{ title }}
  </a>
</template>

<script>
export default {
  props: {
    linkClasses: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
