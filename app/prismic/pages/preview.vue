<template>
  <main>
    <CampaignContent
      :content="company"
      :offerings="offerings"
      company-id="https://www.google.com"
    />
    <TermsDetails
      :company-name="company.company_name_short"
      :offering="offerings[0]"
    />
    <SectionCancellation :company-name="company.company_name_short" />
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";
import CampaignContent from "@/components/Campaign/Content";
import TermsDetails from "@/components/Campaign/TermsDetails";
import SectionCancellation from "@/components/Campaign/SectionCancellation";

export default {
  components: {
    CampaignContent,
    TermsDetails,
    SectionCancellation
  },
  async asyncData({ $prismic, route }) {
    const { documentId } = route.query;
    const company = await $prismic.api.getByID(documentId);
    const offeringRef = company.data.company_offerings[0];
    const offeringId = offeringRef.offering_data.id;
    const offeringData = await $prismic.api.getByID(offeringId);
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
      : investmentDocs.docs.map(doc => doc.data());

    return {
      company: company.data,
      offerings: [
        {
          ...offeringData.data,
          ...offeringRef,
          investments: investmentData,
          metrics: offeringMetrics
        }
      ]
    };
  }
};
</script>
