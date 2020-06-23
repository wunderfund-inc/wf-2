<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
