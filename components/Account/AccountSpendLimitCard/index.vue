<template lang="pug">
  b-card.mb-3(no-body)
    b-card-body
      h1 Investment Limit: {{ spendPool | asCurrency }}
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
    }
  }
}
</script>
