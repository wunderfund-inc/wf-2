<template lang="pug">
  main#campaign
    #campaign-summary
      hero-summary
      progress-section
    #campaign-content
      b-container.py-5
        b-row
          h1 Insert main content here
</template>

<script>
import HeroSummary from "@/components/Campaign/HeroSummary";
import ProgressSection from "@/components/Campaign/ProgressSection";
import CampaignSidebar from "@/components/Campaign/CampaignSidebar";

export default {
  components: {
    HeroSummary,
    ProgressSection,
    CampaignSidebar
  }
};
</script>
