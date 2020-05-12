<template functional>
  <details class="mb-3" open>
    <summary class="mb-3">
      <strong>{{ props.question }}</strong>
    </summary>
    <p>{{ props.answer }}</p>
  </details>
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
