<template>
  <main>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="text-center py-md-5">
          Invest in: {{ company.company_name_short }}
        </h1>

        <article class="col-md-8">
          <checkout-form :offerings="offerings" />
        </article>

        <aside class="col-md-4 mb-3">
          <checkout-summary :company-name="company.company_name_short" />
        </aside>
      </div>
    </div>
    <section-cancellation :company-name="company.company_name_short" />
  </main>
</template>

<script>
import SectionCancellation from "@/components/Campaign/SectionCancellation";
import CheckoutForm from "@/components/Form/Checkout";
import CheckoutSummary from "@/components/Form/Checkout/Summary";

export default {
  middleware: ["authenticated"],
  components: { SectionCancellation, CheckoutForm, CheckoutSummary },
  async asyncData({ route, $prismic, store, error }) {
    try {
      const userId = store.state.auth.userId;
      await store.dispatch("profile/fetch", userId);

      const company = (
        await $prismic.api.getByUID("campaign", route.params.companyId)
      ).data;

      const offerings = await Promise.all(
        company.company_offerings.map(async offering => {
          return {
            ...(await $prismic.api.getByID(offering.offering_data.id)).data,
            ...offering
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
