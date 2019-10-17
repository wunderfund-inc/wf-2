<template lang="pug">
  b-card.mb-3(no-body)
    b-card-body
      h1 Current Invest Limit: {{ spendPool | asCurrency }}
      h4.text-muted Annual Maxiumum Invest Limit: {{ spendMax | asCurrency }}
      small.text-muted Based on your reported annual income and net worth.
        |
        |
        a(href="#") Update it!
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
