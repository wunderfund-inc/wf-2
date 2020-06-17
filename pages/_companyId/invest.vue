<template>
  <main>
    <div class="container">
      <h1 class="text-center py-md-5">
        Invest in: {{ company.company_name_short }}
      </h1>

      <div class="row justify-content-center">
        <article class="col-md-8">
          <checkout-layout :offerings="offerings" />
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
import { endedAlready } from "@/helpers/validators";
import SectionCancellation from "@/components/Campaign/SectionCancellation";
import CheckoutLayout from "@/components/Form/Checkout/Layout";
import CheckoutSummary from "@/components/Form/Checkout/Summary";

export default {
  middleware: ["authenticated"],
  components: { SectionCancellation, CheckoutLayout, CheckoutSummary },
  async asyncData({ redirect, route, $prismic, store, error }) {
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

      const ifAllOfferingsAreClosed = offerings.map(offering => {
        if (offering.is_legacy) return true;
        return endedAlready(offering.offering_date_end);
      });

      if (!ifAllOfferingsAreClosed.includes(false)) {
        return redirect(`/${route.params.companyId}`);
      }

      return { company, offerings };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>
