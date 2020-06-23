<template>
  <font-awesome-icon :icon="[s, i]" />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  props: {
    s: {
      type: String,
      required: true
    },
    i: {
      type: String,
      required: true
    }
  }
};
</script>
