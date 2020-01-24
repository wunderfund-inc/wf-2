<template lang="pug">
main
  header#faq-nav
    .container
      .py-2
        .row
          .col-12.col-md-2
          .col
            b-navbar(type="light")
              b-navbar-nav.mx-auto(justified)
                .row
                  .col-12.col-md-3(
                    v-for="(link, index) in links"
                    :key="index"
                  )
                    b-nav-item(
                      active-class="font-weight-bolder"
                      :to="`/faq/${link}`"
                    ) {{ link | pluralFaq | properCase }}
          .col-12.col-md-2
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
import FaqItem from "@/components/Faq/_Slug/FaqItem";

export default {
  components: {
    FaqItem
  },
  computed: {
    faqs: () => faqs,
    links: () => Object.keys(faqs)
  },
  asyncData({ route }) {
    return { slug: route.params.slug };
  }
};
</script>
