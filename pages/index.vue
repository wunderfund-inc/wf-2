<template>
  <main>
    <hero-section />
    <email-capture />
    <section-browse v-if="companies.length > 0" :companies="companies">
      <template #header>
        <h5 class="text-center pb-4">Live Campaigns:</h5>
      </template>
    </section-browse>
  </main>
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
  },
  async asyncData({ $prismic }) {
    const companies = (
      await $prismic.api.query(
        $prismic.predicates.at("document.type", "campaign")
      )
    ).results;

    const sorted = companies
      .filter(company => !company.data.on_wfh)
      .sort(function(a, b) {
        return (
          new Date(b.last_publication_date) - new Date(a.last_publication_date)
        );
      });

    return { companies: sorted };
  }
};
</script>
