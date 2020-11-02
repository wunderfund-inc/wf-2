<template>
  <main style="min-height: 70vh">
    <div class="container py-5">
      <p>
        Thank you for investing in {{ companyName }}! You can find a copy of
        your investment agreement in your email provided. Also, you can find a
        copy in your account under the Investments menu.
      </p>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ route, $prismic, store, error }) {
    try {
      const { company_name_short: companyName } = (
        await $prismic.api.getByUID("campaign", route.params.companyId)
      ).data;
      return { companyName };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
