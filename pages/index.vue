<template lang="pug">
  main
    hero-section
    email-capture
    section-browse
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
  }
};
</script>
