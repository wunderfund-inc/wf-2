<template lang="pug">
  section
    .container.py-5
      slot
      b-card-group(deck)
        browse-card(
          v-for="(company, index) in companies"
          :key="index"
          :company="company"
        )
</template>

<script>
import { mapGetters } from "vuex";
import BrowseCard from "@/components/Common/BrowseCard";

export default {
  components: {
    BrowseCard
  },
  computed: {
    ...mapGetters({
      companies: "company/companies"
    })
  }
};
</script>
