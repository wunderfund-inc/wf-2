<template lang="pug">
  main
    hero-section
    email-capture
    section-browse(:campaigns="campaigns")
      h5.text-center.pb-4 Live Campaigns:
</template>

<script>
import { db } from "@/plugins/firebase";
import HeroSection from "@/components/Home/HeroSection";
import EmailCapture from "@/components/Home/EmailCapture";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    HeroSection,
    EmailCapture,
    SectionBrowse
  },
  async asyncData() {
    const querySnapshot = await db.collection("companies").get();
    const companyList = querySnapshot.docs.map(doc => doc.data());
    return { campaigns: companyList };
  }
};
</script>
