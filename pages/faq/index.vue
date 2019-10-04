<template lang="pug">
  .container.py-5.text-center
    h1 Frequently Asked Questions (FAQ)
    b-row.py-5
      b-col.py-2(cols="12" md="3" v-for="link in links" :key="link.id")
        b-link.text-decoration-none(:to="`/faq/${link}`")
          b-card(
            img-src="https://www.worldphoto.org/sites/default/files/styles/field_gallery_images-masonry/public/239874_253580_0_%20%C2%A9%20Mojtaba%20Nobakht%2C%20Iran%2C%20Commended%2C%20Open%20Competition%2C%20Portraits%2C%202017%20Sony%20World%20Photography%20Awards.jpg?itok=jN6XnQwD"
            img-top
            no-body
          )
            template(slot="footer") {{ link | properCase }}
</template>

<script>
export default {
  data() {
    return {
      links: ["general", "investor", "company", "legal"]
    };
  }
};
</script>
