<template>
  <main>
    <div v-if="platform === 'WFP'">
      <HeroSection />
    </div>
    <EmailCapture width="col-md-5">
      Be the first to hear about investment opportunities!
    </EmailCapture>
    <SectionBrowse v-if="companies.length > 0" :companies="companies">
      <template #header>
        <h5 class="text-center pb-4">Live Campaigns:</h5>
      </template>
    </SectionBrowse>
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";

export default {
  async asyncData({ $prismic, $config: { PLATFORM } }) {
    const companies = (
      await $prismic.api.query(
        $prismic.predicates.at("document.type", "campaign")
      )
    ).results;

    const sorted = companies
      .filter((company) => {
        return [PLATFORM, "BOTH", "ALL"].includes(company.data.platform);
      })
      .sort(function (a, b) {
        return (
          new Date(b.last_publication_date) - new Date(a.last_publication_date)
        );
      })
      .map(async (company) => {
        if (company.data.company_offerings.length > 0) {
          const offering = company.data.company_offerings[0];
          const offeringId = offering.offering_data.id;
          const offeringDoc = await db
            .collection("metrics_per_offering")
            .doc(offeringId)
            .get();
          const offeringMetrics = offeringDoc.data();
          const offeringData = (await $prismic.api.getByID(offeringId)).data;
          return {
            ...company,
            metrics: offeringMetrics,
            offering: offeringData,
          };
        }
        return company;
      });

    const asyncSorted = await Promise.all(sorted);

    return { platform: PLATFORM, companies: asyncSorted };
  },
};
</script>
