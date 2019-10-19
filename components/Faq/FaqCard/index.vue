<template lang="pug">
  b-link.text-decoration-none(:to="`/faq/${faqlink}`")
    b-card(
      :img-src="imgSrc"
      img-top
      no-body
      border-variant="transparent"
      bg-variant="transparent"
    )
      b-card-footer(
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
      required: false,
      default:
        "https://www.worldphoto.org/sites/default/files/styles/field_gallery_images-masonry/public/239874_253580_0_%20%C2%A9%20Mojtaba%20Nobakht%2C%20Iran%2C%20Commended%2C%20Open%20Competition%2C%20Portraits%2C%202017%20Sony%20World%20Photography%20Awards.jpg?itok=jN6XnQwD"
    }
  }
};
</script>
