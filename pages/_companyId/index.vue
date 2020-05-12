<template>
  <main>
    <campaign-content :content="company" :offerings="offerings" />
    <section-cancellation :company-name="company.company_name_short" />
    <b-navbar fixed="bottom" variant="transparent">
      <nuxt-link
        :to="
          signedIn
            ? `/${$route.params.companyId}/verify`
            : `/auth/login?return_to=/${$route.params.companyId}`
        "
        class="text-decoration-none w-100 d-md-none"
      >
        <main-button extra-classes="btn-block px-5 py-3">
          {{ signedIn ? "Invest Now" : "Login to Invest" }}
        </main-button>
      </nuxt-link>
    </b-navbar>
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";
import MainButton from "@/components/Common/MainButton";
import CampaignContent from "@/components/Campaign/Content";
import SectionCancellation from "@/components/Campaign/SectionCancellation";

export default {
  components: {
    MainButton,
    CampaignContent,
    SectionCancellation
  },
  computed: {
    signedIn() {
      return !!this.$store.state.auth.email;
    }
  },
  async asyncData({ route, $prismic, store, error }) {
    try {
      const company = (
        await $prismic.api.getByUID("campaign", route.params.companyId)
      ).data;

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

      return { company, offerings };
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
