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
    .container.py-4
      .row
        .col-12.col-md-1
        .col
          b-card(no-body)
            b-tabs(v-model="tabIndex" card fill justified)
              b-tab(href="#tos" title="Terms of Service" active)
                b-card-text ToS
              b-tab(href="#pp" title="Privacy Policy")
                b-card-text PP
        .col-12.col-md-1
</template>

<script>
import { faqs } from "@/components/Faq/data.json";

export default {
  data() {
    return {
      tabIndex: 0,
      tabs: ["#tos", "#pp"]
    };
  },
  computed: {
    links: () => Object.keys(faqs)
  },
  mounted() {
    this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.hash);
  }
};
</script>
