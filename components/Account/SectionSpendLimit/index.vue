<template lang="pug">
  section
    b-container
      h2 Current Invest Limit: {{ spendPool | asCurrency }}
      h6.text-muted.mb-0 Annual Maximum Invest Limit: {{ spendMax | asCurrency }}
</template>

<script>
export default {
  props: {
    spendPool: {
      type: Number,
      required: true
    },
    spendMax: {
      type: Number,
      required: true
    }
  }
};
</script>
