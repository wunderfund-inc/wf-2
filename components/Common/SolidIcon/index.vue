<template lang="pug">
  font-awesome-icon(:icon="i")
</template>

<script>
export default {
  props: {
    i: {
      type: String,
      required: true
    }
  }
};
</script>
