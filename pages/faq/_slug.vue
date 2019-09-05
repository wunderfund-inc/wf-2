<template lang="pug">
  main
    b-container.py-5
      section#faq-nav
        b-row.justify-content-md-center
          b-col(lg="3")
          b-col(cols="12" md="auto")
            faq-navbar
          b-col(lg="3")
        b-row
          b-col(md="5")
            faq-left-col
          b-col(md="7")
            faq-right-col(
              faq-intro="This is the designated area for the first “introductory” paragraph, often the answer to the first question in the original text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id."
            )
</template>

<script>
import FaqNavbar from "@/components/Faq/FaqNavbar";
import FaqLeftCol from "@/components/Faq/_Slug/FaqLeftCol";
import FaqRightCol from "@/components/Faq/_Slug/FaqRightCol";

export default {
  components: {
    FaqNavbar,
    FaqLeftCol,
    FaqRightCol
  }
};
</script>
