<template>
  <section>
    <div v-if="content.slice_type === 'single_image'">
      <prismic-image
        :field="content.primary.image"
        class="mw-100 mb-3 rounded"
      />
    </div>

    <div v-if="content.slice_type === 'double_image'">
      <div class="row no-gutters">
        <div class="col-12 col-md-6">
          <prismic-image
            :field="content.primary.left_image"
            class="mw-100 mb-3"
          />
        </div>
        <div class="col-12 col-md-6">
          <prismic-image
            :field="content.primary.right_image"
            class="mw-100 mb-3"
          />
        </div>
      </div>
    </div>

    <div v-if="content.slice_type === 'triple_image'">
      <div class="row no-gutters">
        <div class="col-12 col-md-4">
          <prismic-image
            :field="content.primary.left_image"
            class="mw-100 mb-3"
          />
        </div>
        <div class="col-12 col-md-4">
          <prismic-image
            :field="content.primary.center_image"
            class="mw-100 mb-3"
          />
        </div>
        <div class="col-12 col-md-4">
          <prismic-image
            :field="content.primary.right_image"
            class="mw-100 mb-3"
          />
        </div>
      </div>
    </div>

    <div v-if="content.slice_type === 'text'">
      <prismic-rich-text :field="content.primary.content_text" />
    </div>

    <div v-else-if="content.slice_type === 'image_gallery'">
      <img
        v-for="(item, index) in content.items"
        :key="index"
        :src="item.gallery_image.url"
        :alt="`gallery image ${index}`"
        class="w-100"
      />
    </div>

    <div v-else-if="content.slice_type === 'faqs'">
      <h3 class="pb-2 pt-2 text-center text-md-left">FAQs</h3>
      <details
        v-for="(faq, index) in content.items"
        :key="index"
        class="text-justify"
        open
      >
        <summary>{{ faq.faq_question }}</summary>
        <prismic-rich-text :field="faq.faq_answer" class="py-3" />
      </details>
    </div>

    <div v-else-if="content.slice_type === 'team'">
      <h3 class="pb-4 pt-2 text-center text-md-left">The Team</h3>
      <div class="d-flex justify-content-around">
        <b-card-group columns>
          <b-card
            v-for="(employee, index) in content.items"
            :key="index"
            no-body
            style="border: none"
          >
            <div class="text-center py-3">
              <b-avatar :src="employee.employee_photo.url" size="8rem" />

              <b-card-text class="pt-3 mb-0">
                {{ employee.employee_name }}
              </b-card-text>

              <small class="text-muted mb-0">
                {{ employee.employee_role }}
              </small>
            </div>
            <p class="text-justify">{{ employee.employee_description }}</p>
          </b-card>
        </b-card-group>
      </div>
    </div>

    <div v-else-if="content.slice_type === 'letter_to_investors'">
      <h3 class="pb-4 pt-2 text-center text-md-left">Letter to Investors:</h3>
      <em>
        <prismic-rich-text
          :field="content.primary.issuer_message"
          class="text-justify"
        />
      </em>
      <p class="text-muted">
        - {{ content.primary.issuer_name }}, {{ content.primary.issuer_role }}
      </p>
    </div>

    <div v-else-if="content.slice_type === 'press'">
      <div class="card shadow mb-3">
        <img
          :src="content.primary.img_logo.url"
          :alt="content.primary.img_logo.alt"
        />
        <div class="card-body text-center">
          <a :href="content.primary.link.url" target="_blank" class="text-dark">
            <h2>{{ content.primary.title }}</h2>
          </a>
        </div>
        <img
          :src="content.primary.img_article.url"
          :alt="content.primary.img_article.alt"
        />
      </div>
    </div>

    <div v-else-if="content.slice_type === 'embed_video_player'">
      <div class="wrapper">
        <iframe
          :src="content.primary.embed_url.url"
          frameborder="0"
          class="iframe"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default() {},
      required: true,
    },
  },
  methods: {
    convertLink(content) {
      return content.primary.embed.url;
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the wrapper div with full height and width */
.iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
