<template lang="pug">
  main
    b-container
      section#faq-nav
        b-row
          b-col
          b-col
            faq-navbar
          b-col
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
