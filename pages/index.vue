<template>
  <main>
    <div v-if="platform === 'WFP'">
      <HeroSection />
    </div>
    <EmailCapture width="col-md-5">
      Be the first to hear about investment opportunities!
    </EmailCapture>
    <SectionBrowse
      v-if="companies && companies.length > 0"
      :companies="companies"
    >
      <template #header>
        <h5 class="text-center pb-4">Browse Campaigns:</h5>
      </template>
    </SectionBrowse>
  </main>
</template>

<script>
import { collection, where, query, getDocs } from "firebase/firestore/lite";
import { db } from "@/plugins/firebase";

function filterByPlatform(platform, company) {
  return [platform, "BOTH", "ALL"].includes(company.data.platform);
}

function sortByCampaignPublicationDate(a, b) {
  return new Date(b.last_publication_date) - new Date(a.last_publication_date);
}

async function createCompanyData(prismic, company, metricsData) {
  let metrics = {
    accredited_entities: 0,
    accredited_individuals: 0,
    platform: "WFP",
    slug: company.uid,
    total_investors: 0,
    total_raise: 0,
    unaccredited_entities: 0,
    unaccredited_individuals: 0,
  };
  let offering = {};

  if ("data" in company && company.data.company_offerings.length > 0) {
    const metricsFiltered = metricsData.filter((doc) => {
      return doc.slug === company.uid;
    });
    if (metricsFiltered.length) {
      metrics = metricsFiltered[0];
    }

    if (!company.data.company_offerings.length) {
      return {
        ...company,
        metrics,
        offering,
      };
    }

    const companyOffering = company.data.company_offerings[0];
    const offeringId = companyOffering.offering_data.id;
    const prismicDoc = await prismic.api.getByID(offeringId);
    if (prismicDoc) {
      offering = prismicDoc.data;
    }
  }

  return {
    ...company,
    metrics,
    offering,
  };
}

export default {
  async asyncData({ $prismic, $config: { PLATFORM } }) {
    try {
      const prismicQuery = await $prismic.api.query(
        $prismic.predicate.at("document.type", "campaign")
      );

      if (!prismicQuery.results.length) {
        return { platform: PLATFORM, companies: [] };
      }

      const sorted = prismicQuery.results
        .filter((c) => filterByPlatform(PLATFORM, c))
        .sort(sortByCampaignPublicationDate);

      const slugs = sorted.map((company) => company.uid);
      const colRef = collection(db, "metrics_per_offering");
      const q = query(colRef, where("slug", "in", slugs));
      const querySnapshot = await getDocs(q);
      const documentData = querySnapshot.docs.map((d) => d.data());
      const companyData = sorted.map((company) =>
        createCompanyData($prismic, company, documentData)
      );
      const asyncSorted = await Promise.all(companyData);

      return { platform: PLATFORM, companies: asyncSorted };
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      return { platform: PLATFORM, companies: [] };
    }
  },
};
</script>
