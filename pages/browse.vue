<template lang="pug">
  main
    section-filter
    section-browse
      h5.title.text-left Companies now Fundraising:
      p.subtitle.text-left We diligently
        |
        |
        nuxt-link(to="/faq/company") screen all startups.
</template>

<script>
import SectionFilter from "@/components/Browse/SectionFilter";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    SectionFilter,
    SectionBrowse
  }
};
</script>
