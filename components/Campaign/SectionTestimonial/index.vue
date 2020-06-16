<template>
  <section>
    <h3 class="mb-4">See who invested:</h3>
    <b-card-group columns>
      <b-card v-for="(item, index) in testimonials" :key="index">
        <b-media v-if="item.user_testimonial">
          <template #aside>
            <b-avatar :src="item.user_avatar" />
          </template>
          <p class="mb-0">
            <span v-if="item.user_testimonial">
              <em>{{ item.user_testimonial }}</em>
              <br />
              -
            </span>
            <small class="text-muted">
              {{ item.user_first_name }}
              {{ item.user_last_name | firstLetterOnly }}.
            </small>
          </p>
        </b-media>
        <div v-else class="text-center">
          <b-avatar :src="item.user_avatar" />
          <br />
          <small class="text-muted">Justin C.</small>
        </div>
      </b-card>
    </b-card-group>
    <!-- <div
      v-for="(item, idx) in testimonials.filter(
        el => el.user_testimonial.length === 0
      )"
      :key="idx"
      class="form-row"
    >
      <div
        v-if="item.user_testimonial.length === 0"
        class="col-3 col-md-2 my-2"
      >
        <div class="text-center">
          <b-avatar :src="item.user_avatar" />
          <br />
          <small class="text-muted">Justin C.</small>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    testimonials: {
      type: Array,
      default() {},
      required: false
    }
  }
};
</script>
