<template>
  <main>
    <faq-nav />
    <div class="container py-5 text-justify">
      <h1 class="mb-5 text-center">{{ slug | properCase }} FAQs</h1>
      <article>
        <faq-item
          v-for="(item, index) in $options.faqs[slug].faqItems"
          :key="index"
          :question="item.question"
          :answer="item.answer"
        />
      </article>
    </div>
  </main>
</template>

<script>
import { faqs } from "@/components/Faq/data.json";
import FaqNav from "@/components/Faq/FaqNav";
import FaqItem from "@/components/Faq/_Slug/FaqItem";

export default {
  components: {
    FaqNav,
    FaqItem
  },
  asyncData({ route }) {
    return { slug: route.params.slug };
  },
  fetch() {
    this.$options.faqs = faqs;
  }
};
</script>
