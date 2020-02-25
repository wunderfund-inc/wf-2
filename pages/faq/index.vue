<template lang="pug">
  .container.py-5.text-center
    h1 Frequently Asked Questions (FAQs)
    .row.py-5
      .col-md-3.py-2(v-for="(faq, index) in faqs" :key="index")
        faq-card(:img-src="faq.image" :faq-link="index")
</template>

<script>
import { faqs } from "@/components/Faq/data.json";
import FaqCard from "@/components/Faq/FaqCard";

export default {
  components: {
    FaqCard
  },
  computed: {
    faqs: () => faqs
  }
};
</script>
