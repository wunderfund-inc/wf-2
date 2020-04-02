<template lang="pug">
main
  faq-nav
  section#faq-content
    .container
      .py-2
        .row
          .col-12.col-md-5
            aside
              .text-center
                .pb-3
                  b-img.d-none.d-md-inline(
                    thumbnail
                    :src="require(`@/assets/faq/${slug}.jpeg`)"
                  )
                p {{ slug | pluralFaq | properCase }} FAQs
          .col-12.col-md-7
            aside
              faq-item(
                v-for="(item, index) in $options.faqs[slug].faqItems"
                :key="index"
                :question="item.question"
                :answer="item.answer"
              )
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
