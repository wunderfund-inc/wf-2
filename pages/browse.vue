<template>
  <main>
    <section-filter />
    <section-browse :companies="companies">
      <template #header>
        <h5 class="title text-center">Companies on our Platform:</h5>
      </template>
      <p class="subtitle text-center">
        We diligently
        <nuxt-link to="/faq/company">screen all startups</nuxt-link>
      </p>
    </section-browse>
  </main>
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
  async asyncData({ $prismic }) {
    const companies = (
      await $prismic.api.query(
        $prismic.predicates.at("document.type", "campaign")
      )
    ).results;

    const sorted = companies
      .filter(company => ["WFP", "BOTH", "ALL"].includes(company.data.platform))
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
