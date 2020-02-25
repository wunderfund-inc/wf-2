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
                  b-img-lazy(
                    thumbnail
                    :src="faqs[slug].image"
                  )
                p {{ slug | pluralFaq | properCase }} FAQs
          .col-12.col-md-7
            aside
              p {{ faqs[slug].intro }}
              hr
              div(v-for="item in faqs[slug].faqItems")
                faq-item(:question="item.question" :answer="item.answer")
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
  computed: {
    faqs: () => faqs
  },
  asyncData({ route }) {
    return { slug: route.params.slug };
  }
};
</script>
