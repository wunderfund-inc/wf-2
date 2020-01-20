<template lang="pug">
  main
    section-filter
    section-browse
      template(#header)
        h5.title.text-center Companies Currently Fundraising:
      p.subtitle.text-center (We diligently
        |
        |
        nuxt-link(to="/faq/company") screen all startups)
</template>

<script>
import SectionFilter from "@/components/Browse/SectionFilter";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    SectionFilter,
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
