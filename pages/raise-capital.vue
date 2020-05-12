<template>
  <main>
    <section-jumbotron />
    <section-unique />
    <section-ops />
    <section-eligibility />
    <section-faq />
  </main>
</template>

<script>
import SectionJumbotron from "@/components/RaiseCapital/SectionJumbotron";
import SectionUnique from "@/components/RaiseCapital/SectionUnique";
import SectionOps from "@/components/RaiseCapital/SectionOps";
import SectionEligibility from "@/components/RaiseCapital/SectionEligibility";
import SectionFaq from "@/components/RaiseCapital/SectionFaq";

export default {
  components: {
    SectionJumbotron,
    SectionUnique,
    SectionOps,
    SectionEligibility,
    SectionFaq
  }
};
</script>
