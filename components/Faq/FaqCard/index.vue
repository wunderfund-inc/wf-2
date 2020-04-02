<template>
  <nuxt-link :to="`/faq/${faqLink}`" class="text-decoration-none text-dark">
    <b-card no-body border-variant="transparent" bg-variant="transparent">
      <b-card-img
        :src="require(`@/assets/faq/${faqLink}.jpeg`)"
        class="d-none d-md-block"
        top
      />
      <b-card-footer
        class="text-center"
        footer-bg-variant="transparent"
        footer-border-variant="transparent"
      >
        {{ faqLink | pluralFaq | properCase }}
      </b-card-footer>
    </b-card>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    faqLink: {
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
