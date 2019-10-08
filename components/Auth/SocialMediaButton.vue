<template lang="pug">
  b-button(
    block
    size="lg"
    :style="`background-color: ${color}; border: 1px solid ${color}`"
  )
    brand-icon(:i="")
    span.d-inline.d-md-none {{ name }}
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>
