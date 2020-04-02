<template lang="pug">
header#faq-nav
  .container
    .py-2
      .row
        .col-md-10.offset-md-1
          b-navbar(type="light")
            b-navbar-nav.mx-auto(justified)
              .row
                .col-12.col-md-4(
                  v-for="(link, index) in Object.keys($options.faqs)"
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
  fetch() {
    this.$options.faqs = faqs;
  }
};
</script>
