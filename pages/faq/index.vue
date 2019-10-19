<template lang="pug">
  .container.py-5.text-center
    h1 Frequently Asked Questions (FAQs)
    b-row.py-5
      b-col.py-2(cols="12" md="3" v-for="link in links" :key="link.id")
        faq-card(:faq-link="link")
</template>

<script>
import d from "./data.json";
import FaqCard from "@/components/Faq/FaqCard";

export default {
  components: {
    FaqCard
  },
  data() {
    return {
      links: d.faqLinks
    };
  }
};
</script>
