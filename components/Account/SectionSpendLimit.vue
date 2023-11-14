<template>
  <div class="card bg-light mb-3">
    <h2 class="card-body mb-0 pb-0">
      Current Investment Limit:
      {{ limit - spent > 0 ? limit - spent : 0 | asCurrency }}
    </h2>
    <h5 class="card-body text-muted mb-0">
      Annual Maximum Limit: {{ limit | asCurrency }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: () => 0,
      required: false,
    },
    spent: {
      type: Number,
      default: () => 0,
      required: false,
    },
  },
};
</script>
