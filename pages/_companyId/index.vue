<template>
  <main>
    <campaign-content
      :content="company"
      :offerings="offerings"
      :company-id="$route.params.companyId"
    />
    <section-investments-map
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

  return snapshot.empty ? [] : snapshot.docs.map(location => location.data());
}

async function getCompanyLocation(zip) {
  const response = await fetch(`http://api.zippopotam.us/us/${zip}`);
  const location = await response.json();
  return {
    lat: Number(location.places[0].latitude),
    lng: Number(location.places[0].longitude)
  };
}

export default {
  components: {
    CampaignContent,
    SectionInvestmentsMap,
    TermsDetails,
    SectionCancellation
  },
  computed: {
    signedIn() {
      return !!this.$store.state.auth.email;
    }
  },
  async asyncData({ route, $prismic, store, error }) {
    try {
      const userId = store.state.auth.userId;
      await store.dispatch("profile/fetch", userId);

      const companyId = route.params.companyId;
      await store.dispatch("company/fetchComments", companyId);

      const company = (await $prismic.api.getByUID("campaign", companyId)).data;

      const offerings = await Promise.all(
        company.company_offerings.map(async offering => {
          const investmentDocuments = await db
            .collection("investments")
            .where("offering_id", "==", offering.offering_data.id)
            .get();

          const investmentData = investmentDocuments.empty
            ? []
            : investmentDocuments.docs.map(doc => doc.data());

          return {
            ...(await $prismic.api.getByID(offering.offering_data.id)).data,
            ...offering,
            investments: investmentData
          };
        })
      );

      const zip = "45202";
      const companyLocation = await getCompanyLocation(zip);

      const locations = await getLocations(offerings[0].offering_data.id);

      return {
        company,
        offerings,
        companyLocation,
        locations
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
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
