<template lang="pug">
  section
    b-container.py-5
      slot
      b-row
        b-col(v-for="(campaign, index) in campaigns" :key="index" md="4")
          browse-card(:campaign="campaign")
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
