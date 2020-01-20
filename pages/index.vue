<template lang="pug">
  main
    hero-section
    email-capture
    section-browse
      template(#header)
        h5.text-center.pb-4 Live Campaigns:
</template>

<script>
import HeroSection from "@/components/Home/HeroSection";
import EmailCapture from "@/components/Home/EmailCapture";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    HeroSection,
    EmailCapture,
    SectionBrowse
  },
  async fetch({ store }) {
    try {
      await store.dispatch("company/fetchCompanies");
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
