<template>
  <main>
    <campaign-content
      :content="company"
      :offerings="offerings"
      :company-id="$route.params.companyId"
    />
    <section-investments-map
      v-if="locations.length > 0"
      :company-location="companyLocation"
      :locations="locations"
    />
    <terms-details
      :company-name="company.company_name_short"
      :offering="offerings[0]"
    />
    <section-cancellation :company-name="company.company_name_short" />
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";
import CampaignContent from "@/components/Campaign/Content";
import SectionInvestmentsMap from "@/components/Campaign/SectionInvestmentsMap";
import TermsDetails from "@/components/Campaign/TermsDetails";
import SectionCancellation from "@/components/Campaign/SectionCancellation";

async function getLocations(offeringId) {
  const snapshot = await db
    .collection("investment_locations")
    .where("offering_id", "==", offeringId)
    .get();

  return snapshot.empty ? [] : snapshot.docs.map((location) => location.data());
}

async function getCompanyLocation(zip) {
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
  const location = await response.json();
  return {
    lat: Number(location.places[0].latitude),
    lng: Number(location.places[0].longitude),
  };
}

export default {
  components: {
    CampaignContent,
    SectionInvestmentsMap,
    TermsDetails,
    SectionCancellation,
  },
  async asyncData({ route, $prismic, store, error }) {
    try {
      const userId = store.state.auth.userId;
      if (userId) {
        await store.dispatch("profile/fetch", userId);
      }

      const companyId = route.params.companyId;
      await store.dispatch("company/fetchComments", companyId);

      const company = (await $prismic.api.getByUID("campaign", companyId)).data;
      const offeringRef = company.company_offerings[0];
      const offeringId = offeringRef.offering_data.id;
      const offeringData = (await $prismic.api.getByID(offeringId)).data;

      const offeringDoc = await db
        .collection("metrics_per_offering")
        .doc(offeringId)
        .get();
      const offeringMetrics = offeringDoc.data();

      const investmentDocs = await db
        .collection("investments")
        .where("offering_id", "==", offeringId)
        .get();

      const investmentData = investmentDocs.empty
        ? []
        : investmentDocs.docs.map((doc) => doc.data());

      const zip = "45202";
      const companyLocation = await getCompanyLocation(zip);

      const locations = await getLocations(offeringId);

      return {
        company,
        offerings: [
          {
            ...offeringData,
            ...offeringRef,
            investments: investmentData,
            metrics: offeringMetrics,
          },
        ],
        companyLocation,
        locations,
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  computed: {
    signedIn() {
      return !!this.$store.state.auth.email;
    },
  },
};
</script>

<style lang="scss" scoped>
$gold: #c89f5c;

.btn {
  &__gold {
    border: $gold 1px solid;
    background-color: $gold;

    &:hover,
    &:focus {
      background-color: darken($gold, 10%);
    }
  }
}
</style>
