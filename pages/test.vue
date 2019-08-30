<template lang="pug">
  div#campaign
    section#hero
    progress-section
    section#content
      b-container.py-4
        b-row
          b-col(md="9")
            h1 Main content
          b-col(md="3")
            aside
              h1 Sidebar
</template>

<script>
import ProgressSection from "@/components/Campaign/ProgressSection";

export default {
  components: {
    ProgressSection
  }
};
</script>
