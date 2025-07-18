<template>
  <main>
    <campaign-content
      :content="company"
      :offerings="offerings"
      :company-id="$route.params.companyId"
    />
    <section-investments-map
      v-if="locations && locations.length > 0"
      :company-location="companyLocation"
      :locations="locations"
    />
    <terms-details
      :company-name="company.company_name_short"
      :offering="offerings[0]"
    />
    <section-ttw-details v-if="company.ttw_phase" />
    <section-cancellation v-else :company-name="company.company_name_short" />
  </main>
</template>

<script>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import CampaignContent from "@/components/Campaign/Content";
import SectionCancellation from "@/components/Campaign/SectionCancellation";
import SectionInvestmentsMap from "@/components/Campaign/SectionInvestmentsMap";
import SectionTtwDetails from "@/components/Campaign/SectionTtwDetails";
import TermsDetails from "@/components/Campaign/TermsDetails";
import { db } from "@/plugins/firebase";

async function getLocations(offeringId) {
  const colRef = collection(db, "investment_locations");
  const q = query(colRef, where("offering_id", "==", offeringId));
  const snapshot = await getDocs(q);
  return snapshot.empty ? [] : snapshot.docs.map((d) => d.data());
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
    SectionCancellation,
    SectionInvestmentsMap,
    SectionTtwDetails,
    TermsDetails,
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
      if (company.company_offerings && company.company_offerings.length > 0) {
        const offeringRef = company.company_offerings[0];
        const offeringId = offeringRef.offering_data.id;
        const offeringData = (await $prismic.api.getByID(offeringId)).data;

        const offeringDocRef = doc(db, `metrics_per_offering/${offeringId}`);
        const offeringSnapshot = await getDoc(offeringDocRef);
        const offeringMetrics = offeringSnapshot.data();

        const investmentsColRef = collection(db, "investments");
        const investmentsQuery = query(
          investmentsColRef,
          where("offering_id", "==", offeringId)
        );
        const snapshot = await getDocs(investmentsQuery);
        const investmentData = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => doc.data());

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
      }
      return { company, offerings: [], locations: [] };
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

<style scoped>
.btn__gold {
  border: #c89f5c 1px solid;
}

.btn__gold:hover,
.btn__gold:focus {
  background-color: darken(#c89f5c, 10%);
}
</style>
