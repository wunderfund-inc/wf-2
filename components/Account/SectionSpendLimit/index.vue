<template lang="pug">
  section
    h2 Current Invest Limit: {{ spendPool | asCurrency }}
    h4.text-muted.mb-0 Annual Maximum Invest Limit: {{ spendMax | asCurrency }}
    small.text-muted
      slot
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
