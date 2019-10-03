<template lang="pug">
  main
    section-filter
    section-browse
</template>

<script>
import SectionFilter from "@/components/Browse/SectionFilter.vue";
import SectionBrowse from "@/components/Browse/SectionBrowse.vue";

export default {
  components: {
    SectionFilter,
    SectionBrowse
  }
};
</script>
