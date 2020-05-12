<template>
  <b-card>
    <h2>Current Investment Limit: {{ spendPoolCurrent | asCurrency }}</h2>
    <h5 class="text-muted mb-0">
      Annual Maximum Limit: {{ spendPoolMax | asCurrency }}
    </h5>
  </b-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      spendPoolCurrent: "profile/spendPoolCurrent",
      spendPoolMax: "profile/spendPoolMax"
    })
  }
};
</script>
