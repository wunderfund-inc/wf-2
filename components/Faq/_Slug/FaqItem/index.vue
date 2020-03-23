<template lang="pug" functional>
  details.pb-3(open)
    summary
      strong {{ props.question }}
    br
    p {{ props.answer }}
</template>

<script>
export default {
  functional: true,
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
