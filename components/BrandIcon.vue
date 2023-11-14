<template>
  <font-awesome-icon :icon="['fab', i]" />
</template>

<script>
export default {
  props: {
    i: {
      type: String,
      required: true,
    },
  },
};
</script>
