<template lang="pug">
  nuxt-link.text-decoration-none.text-dark(:to="`/faq/${faqLink}`")
    b-card(
      :img-src="require(`@/assets/faq/test.jpeg`)"
      img-top
      no-body
      border-variant="transparent"
      bg-variant="transparent"
    )
      b-card-footer.text-center(
        footer-bg-variant="transparent"
        footer-border-variant="transparent"
      ) {{ faqLink | pluralFaq | properCase }}
</template>

<script>
export default {
  props: {
    faqLink: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  .card:hover {
    cursor: pointer;
    text-decoration: none;
    -webkit-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    -moz-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
  }
}
</style>
