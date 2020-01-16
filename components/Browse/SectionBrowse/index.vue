<template lang="pug">
  section
    .container.py-5
      slot
      b-card-group(deck)
        browse-card(
          v-for="(campaign, index) in campaigns"
          :key="index"
          :campaign="campaign"
        )
</template>

<script>
import BrowseCard from "@/components/Common/BrowseCard";

export default {
  components: {
    BrowseCard
  },
  props: {
    campaigns: {
      type: Array,
      default() {},
      required: true
    }
  }
};
</script>
