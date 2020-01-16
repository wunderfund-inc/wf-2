<template lang="pug">
  main
    section-filter
    section-browse(:campaigns="campaigns")
      h5.title.text-center Companies Currently Fundraising:
      p.subtitle.text-center (We diligently
        |
        |
        nuxt-link(to="/faq/company") screen all startups)
</template>

<script>
import { db } from "@/plugins/firebase";
import SectionFilter from "@/components/Browse/SectionFilter";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    SectionFilter,
    SectionBrowse
  },
  async asyncData() {
    const querySnapshot = await db.collection("companies").get();
    const companyList = querySnapshot.docs.map(doc => doc.data());
    return { campaigns: companyList };
  }
};
</script>
