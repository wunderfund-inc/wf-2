<template>
  <main>
    <section-filter />
    <section-browse :companies="companies">
      <template #header>
        <h5 class="title text-center">Companies on our Platform:</h5>
      </template>
      <p class="subtitle text-center">
        We diligently
        <nuxt-link to="/faq/company">screen all startups</nuxt-link>
      </p>
    </section-browse>
  </main>
</template>

<script>
import SectionFilter from "@/components/Browse/SectionFilter";
import SectionBrowse from "@/components/Browse/SectionBrowse";

export default {
  components: {
    SectionFilter,
    SectionBrowse
  },
  async asyncData({ $prismic }) {
    const companies = (
      await $prismic.api.query(
        $prismic.predicates.at("document.type", "campaign")
      )
    ).results;
    return { companies };
  }
};
</script>
