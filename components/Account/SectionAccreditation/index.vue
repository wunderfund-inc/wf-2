<template lang="pug">
  section(v-if="!isAccredited")
    hr
    h4 Are you an Accredited Investor?
    p Click the button below, and we'll verify you via email.
    b-button(variant="success") Verify Me!
</template>

<script>
export default {
  props: {
    isAccredited: {
      type: Boolean,
      required: true
    }
  }
};
</script>
