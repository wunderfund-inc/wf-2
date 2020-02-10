<template lang="pug">
  section
    .container.pt-5
      slot(name="header")
      .row
        .col-12.col-md-4(
          v-for="(company, index) in companies"
          :key="index"
        )
          browse-card(:company="company")
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
