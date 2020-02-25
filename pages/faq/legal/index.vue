<template lang="pug">
main
  faq-nav
  section#faq-content
    .container.py-4
      .row
        .col-md-10.offset-md-1
          b-card(no-body)
            b-tabs(v-model="tabIndex" card fill justified)
              b-tab(href="#tos" title="Terms of Service" active)
                b-card-text ToS
              b-tab(href="#pp" title="Privacy Policy")
                b-card-text
                  privacy-policy
</template>

<script>
import FaqNav from "@/components/Faq/FaqNav";
import PrivacyPolicy from "@/components/Faq/Legal/PrivacyPolicy";

export default {
  components: {
    FaqNav,
    PrivacyPolicy
  },
  data() {
    return {
      tabIndex: 0,
      tabs: ["#tos", "#pp"]
    };
  },
  mounted() {
    this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.hash);
  }
};
</script>
