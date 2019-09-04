<template lang="pug">
  main#campaign
    #campaign-summary
      hero-summary
      progress-section
    #campaign-content
      b-container.py-5
        b-row
          b-col(md="3")
            campaign-sidebar
          b-col(md="9")
            h1 Main content
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
