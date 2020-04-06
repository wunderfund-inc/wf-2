<template lang="pug">
section#testimonials
  .container(v-if="testimonials.length > 0")
    h4 See who's invested so far...
    b-card-group(deck)
      .row
        .col-12.col-md-4(v-for="(item, index) in testimonials" :key="index")
          b-card.my-1(v-if="item.approved")
            b-media
              template(#aside)
                b-avatar(:src="item.avatar || null")
              p.mb-0 "{{ item.testimonial }}" - #[small.text-muted {{ item.name.first }} {{ item.name.last | firstLetterOnly}}.]

</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      testimonials: "company/testimonials"
    })
  }
};
</script>
