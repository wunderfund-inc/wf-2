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
// TODO: remove when store Action replaces this.
import d from "@/components/Browse/data.json";
import SectionFilter from "@/components/Browse/SectionFilter";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    SectionFilter,
    SectionBrowse
  },
  data() {
    return {
      campaigns: d.campaigns
    };
  }
};
</script>
