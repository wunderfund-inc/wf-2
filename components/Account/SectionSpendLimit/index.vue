<template lang="pug">
  section
    b-container
      h2 Current Invest Limit: {{ spendCurrent | asCurrency }}
      h6.text-muted.mb-0 Annual Maximum Invest Limit: {{ spendMax | asCurrency }}
</template>

<script>
export default {
  computed: {
    spendPool() {
      return this.$store.getters["user/currentUser"].spendPool;
    },
    spendCurrent() {
      return this.spendPool.current;
    },
    spendMax() {
      return this.spendPool.max;
    }
  }
};
</script>
