<template>
  <main>
    <div style="min-height: 60vh">
      <b-overlay :show="submittingCheckoutForm" variant="light">
        <template #overlay>
          <div class="text-center">
            <b-spinner large variant="dark" />
            <p class="pt-3 text-dark">
              Please hold as we create your agreement to sign...
            </p>
          </div>
        </template>
        <h1 class="text-center py-md-5">
          Invest in: {{ company.company_name_short }}
        </h1>
        <InvestmentForm
          :company-name="company.company_name_short"
          :user="user"
          :offering="offering"
        />
      </b-overlay>
    </div>
    <SectionCancellation company-name="Test Company" />
  </main>
</template>

<script>
import InvestmentForm from "@/components/InvestmentForm";
import SectionCancellation from "@/components/Campaign/SectionCancellation";
import { endedAlready } from "@/helpers/validators";
import { db } from "../../plugins/firebase";

export default {
  middleware: ["authenticated"],
  components: {
    InvestmentForm,
    SectionCancellation,
  },
  async asyncData({ redirect, route, $prismic, store, error }) {
    try {
      const companyId = route.params.companyId;
      const companyRef = await $prismic.api.getByUID("campaign", companyId);
      const company = companyRef.data;

      const offeringMetadata = company.company_offerings[0].offering_data;
      const offeringId = offeringMetadata.id;
      const offeringData = (await $prismic.api.getByID(offeringId)).data;
      const offering = {
        ...offeringMetadata,
        ...offeringData,
      };

      if (endedAlready(offering.offering_date_end)) {
        return redirect(`/${companyId}`);
      }

      const userId = store.state.auth.userId;
      const userRef = await db.collection("users").doc(userId).get();
      const userData = userRef.data();

      const user = {
        annualIncome: userData.accreditation_ai,
        netWorth: userData.accreditation_nw,
        isEntity: userData.is_entity,
        firstName: userData.first_name,
        lastName: userData.last_name,
        entityName: userData.entity_name,
        street1: userData.address_street_1,
        street2: userData.address_street_2,
        city: userData.address_city,
        state: userData.address_state,
        country: userData.address_country,
        postal: userData.address_postal,
        avatar: userData.avatar,
        accountId: userData.transact_api_account_id,
      };

      return { user, company, offering };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  computed: {
    submittingCheckoutForm() {
      return this.$store.state.agreement.submitting;
    },
  },
};
</script>
