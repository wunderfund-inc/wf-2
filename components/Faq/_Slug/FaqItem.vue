<template lang="pug">
  details.pb-3
    summary {{ question }}
    br
    p {{ answer }}
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
};
</script>
