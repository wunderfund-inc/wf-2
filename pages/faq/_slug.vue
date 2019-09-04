<template lang="pug">
  main
    b-container
      section#faq-nav
        b-row.justify-content-md-center
          b-col(lg="3")
          b-col(cols="12" md="auto")
            faq-navbar
          b-col(lg="3")
</template>

<script>
import FaqNavbar from "@/components/Faq/FaqNavbar/index";

export default {
  components: {
    FaqNavbar
  },
  data() {
    return {
      word: this.$route.params.slug
    };
  }
};
</script>
