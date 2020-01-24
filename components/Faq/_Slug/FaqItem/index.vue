<template lang="pug" functional>
  details.pb-3
    summary {{ props.question }}
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
