<template lang="pug">
  .container.py-5.text-center
    h1 Frequently Asked Questions (FAQs)
    .row.py-5
      .col-md-4.py-2(v-for="(faq, index) in $options.faqs" :key="index")
        faq-card(:faq-link="index")
</template>

<script>
import { faqs } from "@/components/Faq/data.json";
import FaqCard from "@/components/Faq/FaqCard";

export default {
  components: {
    FaqCard
  },
  fetch() {
    this.$options.faqs = faqs;
  }
};
</script>
