<template lang="pug">
header#faq-nav
  .container
    .py-2
      .row
        .col-md-10.offset-md-1
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
</template>

<script>
import { faqs } from "@/components/Faq/data.json";

export default {
  computed: {
    links: () => Object.keys(faqs)
  }
};
</script>
