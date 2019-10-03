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
  data() {
    return {
      campaigns: [
        {
          id: "1",
          cardImg: "https://picsum.photos/300/300/?image=41",
          companyName: "Esoteric Brewing Company",
          companyMotto: "More than just a beer",
          companyCity: "Cincinnati",
          companyState: "OH",
          offeringType: "A"
        }
      ]
    };
  }
};
</script>
