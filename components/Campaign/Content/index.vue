<template>
  <main>
    <div id="hero" class="container">
      <div class="row">
        <div class="col-12 d-block d-md-none py-3">
          <aside>
            <div>
              <h1 class="text-center text-md-left">
                {{ content.company_name_short }}
              </h1>
              <h4 class="pt-2 text-muted text-center text-md-left">
                {{ content.company_motto }}
              </h4>
              <div class="text-center text-md-left">
                <small class="text-muted">
                  <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                  {{ content.company_location_city }},
                  {{ content.company_location_state }}
                </small>
              </div>
            </div>

            <section-offering-details
              :company-name="content.company_name_short"
              :offering="offerings[0]"
            />
          </aside>
        </div>
        <div class="col-12 col-md-7">
          <article>
            <div v-if="content.campaign_video.embed_url" class="pb-3">
              <b-embed
                :src="convertLink(content.campaign_video)"
                type="iframe"
                allowfullscreen
              />
              <div class="pt-3">
                <template v-if="content.company_website_url.url">
                  <small class="px-2">
                    <a
                      :href="content.company_website_url.url"
                      target="_blank"
                      class="text-muted"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'link']"
                        class="fa-lg"
                      />
                    </a>
                  </small>
                </template>
                <small
                  v-for="(link, index) in content.company_social_media"
                  :key="index"
                  class="px-2"
                >
                  <a :href="link.social_media_url.url" class="text-muted">
                    <font-awesome-icon
                      :icon="['fab', iconIt(link.social_media_brand)]"
                      class="fa-lg"
                    />
                  </a>
                </small>
                <template v-if="content.company_edgar_url.url">
                  <small class="px-2">
                    <b-link
                      :href="content.company_edgar_url.url"
                      target="_blank"
                      class="text-dark"
                    >
                      EDGAR Filing
                    </b-link>
                  </small>
                </template>
                <small>
                  Share with your friends!
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u= https%3A%2F%2Fwunderfund.co%2Fc%2F${$route.params.companyId}`"
                    target="_blank"
                    class="pl-3 pr-2 text-muted"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'facebook-square']"
                      class="fa-lg"
                    />
                  </a>
                  <a
                    :href="`https://www.linkedin.com/shareArticle/?mini=true&ur l=https://wunderfund.co%2Fc%2F${$route.params.companyId}&ti tle=I%20invested%20in%20${content.company_name_short}!`"
                    target="_blank"
                    class="pl-3 pr-2 text-muted"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'linkedin']"
                      class="fa-lg"
                    />
                  </a>
                  <a
                    :href="`https://twitter.com/intent/tweet?url=https://wu nderfund.co%2Fc%2F${$route.params.companyId}&text=I%20invested%20in%20${content.company_name_short}!`"
                    target="_blank"
                    class="pl-3 pr-2 text-muted"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'twitter-square']"
                      class="fa-lg"
                    />
                  </a>
                </small>
              </div>
            </div>

            <section-slice
              v-for="(slice, index) in content.body"
              :key="`slice-${index}`"
              :content="slice"
            />

            <section-testimonial
              v-if="testimonials.length > 0"
              :testimonials="testimonials"
            />

            <section class="py-3">
              <h3 class="pb-4">Questions or Comments?</h3>
              <div v-if="comments.length > 0" class="mb-4">
                <comment-item
                  v-for="(comment, index) in comments"
                  :key="index"
                  :comment="comment"
                />
              </div>
              <div class="mb-4">
                <comment-form v-if="signedIn" :company-id="companyId" />
                <p v-else>
                  <nuxt-link to="/auth/login">Login</nuxt-link> or
                  <nuxt-link to="/auth/register">Sign Up</nuxt-link> to comment!
                </p>
              </div>
            </section>
          </article>
        </div>
        <div class="col-12 col-md-5 d-none d-md-block">
          <div>
            <h1 class="text-center text-md-left">
              {{ content.company_name_short }}
            </h1>
            <h4 class="pt-2 text-muted text-center text-md-left">
              {{ content.company_motto }}
            </h4>
            <div class="text-center text-md-left">
              <small class="text-muted">
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                {{ content.company_location_city }},
                {{ content.company_location_state }}
              </small>
            </div>
            <div v-if="!content.campaign_video.embed_url" class="py-3">
              <template v-if="content.company_website_url.url">
                <small class="px-2">
                  <a
                    :href="content.company_website_url.url"
                    target="_blank"
                    class="text-muted"
                  >
                    <font-awesome-icon :icon="['fas', 'link']" class="fa-lg" />
                  </a>
                </small>
              </template>
              <small
                v-for="(link, index) in content.company_social_media"
                :key="index"
                class="px-2"
              >
                <a :href="link.social_media_url.url" class="text-muted">
                  <font-awesome-icon
                    :icon="['fab', iconIt(link.social_media_brand)]"
                    class="fa-lg"
                  />
                </a>
              </small>
              <template v-if="content.company_edgar_url.url">
                <small class="px-2">
                  <b-link
                    :href="content.company_edgar_url.url"
                    target="_blank"
                    class="text-dark"
                  >
                    EDGAR Filing
                  </b-link>
                </small>
              </template>
              <small>
                Share with your friends!
                <a
                  :href="`https://www.facebook.com/sharer/sharer.php?u= https%3A%2F%2Fwunderfund.co%2Fc%2F${$route.params.companyId}`"
                  target="_blank"
                  class="pl-3 pr-2 text-muted"
                >
                  <font-awesome-icon
                    :icon="['fab', 'facebook-square']"
                    class="fa-lg"
                  />
                </a>
                <a
                  :href="`https://www.linkedin.com/shareArticle/?mini=true&ur l=https://wunderfund.co%2Fc%2F${$route.params.companyId}&ti tle=I%20invested%20in%20${content.company_name_short}!`"
                  target="_blank"
                  class="pl-3 pr-2 text-muted"
                >
                  <font-awesome-icon
                    :icon="['fab', 'linkedin']"
                    class="fa-lg"
                  />
                </a>
                <a
                  :href="`https://twitter.com/intent/tweet?url=https://wu nderfund.co%2Fc%2F${$route.params.companyId}&text=I%20invested%20in%20${content.company_name_short}!`"
                  target="_blank"
                  class="pl-3 pr-2 text-muted"
                >
                  <font-awesome-icon
                    :icon="['fab', 'twitter-square']"
                    class="fa-lg"
                  />
                </a>
              </small>
            </div>
          </div>
          <aside style="position: sticky; top: 12px">
            <section-offering-details
              :company-name="content.company_name_short"
              :offering="offerings[0]"
            />
            <TestTheWatersForm
              v-if="content.ttw_phase && offerings.length < 1"
              :company-name="content.company_name_short"
            />
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import SectionOfferingDetails from "@/components/Campaign/SectionOfferingDetails";
import CommentItem from "@/components/Campaign/CommentItem";
import CommentForm from "@/components/Campaign/CommentForm";
import SectionTestimonial from "@/components/Campaign/SectionTestimonial";
import SectionSlice from "@/components/Campaign/SectionSlice";

export default {
  components: {
    SectionOfferingDetails,
    CommentItem,
    CommentForm,
    SectionTestimonial,
    SectionSlice,
  },
  props: {
    companyId: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      default() {},
      required: true,
    },
    offerings: {
      type: Array,
      default() {},
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      comments: "company/comments",
    }),
    signedIn() {
      return !!this.$store.state.auth.email;
    },
    testimonials() {
      if (this.offerings && this.offerings.length > 0) {
        const offering = this.offerings[0];
        const investments = offering.investments.filter((i) => {
          const id = i.investment_agreement_id;
          return id && id.length > 0;
        });
        return investments;
      }
      return [];
    },
  },
  methods: {
    iconIt(platform) {
      const formatted = platform.toLowerCase();
      switch (formatted) {
        case "facebook":
          return "facebook-square";

        case "twitter":
          return "twitter-square";

        default:
          return formatted;
      }
    },
    convertLink(url) {
      const provider = url.provider_url;

      switch (provider) {
        case "https://www.youtube.com/": {
          const videoId = url.embed_url.replace(`${provider}watch?v=`, "");
          return `${provider}embed/${videoId}?feature=oembed`;
        }
        case "https://vimeo.com/": {
          return `https://player.vimeo.com/video/${url.video_id}`;
        }
        default: {
          return url;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$gold: #c89f5c;
$darker-gold: #84683c;

.text {
  &__gold-dark {
    color: $gold;
  }
}

.btn {
  &__gold {
    border: $gold 1px solid;
    background-color: $gold;

    &:hover,
    &:focus {
      border: $gold 1px solid;
      background-color: transparent;
      color: $gold;
    }
  }
}
</style>
