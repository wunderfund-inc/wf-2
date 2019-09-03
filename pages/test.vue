<template lang="pug">
  div#campaign
    section#hero
      hero-summary
      progress-section
    section#content
      b-container.py-4
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
