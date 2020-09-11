<template>
  <main>
    <div v-if="platform === 'WFP'">
      <hero-section />
      <email-capture />
    </div>
    <section-browse v-if="companies.length > 0" :companies="companies">
      <template #header>
        <h5 class="text-center pb-4">Live Campaigns:</h5>
      </template>
    </section-browse>
  </main>
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
  computed: {
    platform() {
      return process.env.PLATFORM;
    }
  },
  async asyncData({ $prismic }) {
    const platform = process.env.PLATFORM;

    const companies = (
      await $prismic.api.query(
        $prismic.predicates.at("document.type", "campaign")
      )
    ).results;

    const sorted = companies
      .filter(company => {
        return [platform, "BOTH", "ALL"].includes(company.data.platform);
      })
      .sort(function(a, b) {
        return (
          new Date(b.last_publication_date) - new Date(a.last_publication_date)
        );
      })
      .map(async company => {
        const offering = company.data.company_offerings[0];
        const offeringId = offering.offering_data.id;
        const offeringDoc = await db
          .collection("metrics_per_offering")
          .doc(offeringId)
          .get();
        const offeringMetrics = offeringDoc.data();
        const offeringData = (await $prismic.api.getByID(offeringId)).data;
        return { ...company, metrics: offeringMetrics, offering: offeringData };
      });

    const asyncSorted = await Promise.all(sorted);

    return { companies: asyncSorted };
  }
};
</script>
