<template lang="pug">
  main
    hero-section
    email-capture
    section-browse(:campaigns="campaigns")
      h5.text-center.pb-4 Live Campaigns:
</template>

<script>
// TODO: remove when store Action replaces this.
import d from "@/components/Browse/data.json";
import HeroSection from "@/components/Home/HeroSection";
import EmailCapture from "@/components/Home/EmailCapture";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    HeroSection,
    EmailCapture,
    SectionBrowse
  },
  asyncData() {
    return {
      campaigns: d.campaigns
    };
  }
};
</script>
