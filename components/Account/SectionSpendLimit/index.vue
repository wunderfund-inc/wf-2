<template lang="pug">
  section
    b-container
      h2 Current Invest Limit: {{ spendPool.current | asCurrency }}
      h6.text-muted.mb-0 Annual Maximum Invest Limit: {{ spendPool.max | asCurrency }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      spendPool: "user/spendPool"
    })
  }
};
</script>
