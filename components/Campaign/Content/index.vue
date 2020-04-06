<template lang="pug">
  main.py-md-5
    section#hero
      .container.my-3
        .row
          .col-12.col-md-7
            .row
              .col.mb-1
                b-embed(
                  type="iframe"
                  :src="`${company.campaignVideo.platform}/${company.campaignVideo.handle}`"
                  aspect="16by9"
                  allowfullscreen
                )
            .row
              .col
                small.text-muted
                  font-awesome-icon(:icon="['fas', 'map-marker-alt']")
                  |
                  | {{ company.location.city }}, {{ company.location.state }}
              .col.text-right
                small.px-2(v-if="company.website")
                  a.text-muted(:href="company.website" target="_blank")
                    font-awesome-icon.fa-lg(:icon="['fas', 'link']")
                small.px-2(
                  v-for="(link, index) in company.socialMediaLinks"
                  :key="index"
                )
                  a.text-muted(
                    :href="`${link.platform}/${link.handle}`"
                    target="_blank"
                  )
                    font-awesome-icon.fa-lg(:icon="['fab', iconIt(link.platform)]")
                small.px-2
                  b-link.text-dark(:href="company.edgarUrl" target="_blank") EDGAR Filing
          .col-12.col-md-5.pt-5.pt-md-0
            h1 {{ company.name.short }}
            h4 {{ company.motto }}
            b-card.my-3(
              v-for="(offering, index) in offerings"
              :key="index"
              no-body
            )
              b-card-header(header-tag="header" role="tab") Regulation {{ offering.offeringType }} Offering Details:
              b-card-body
                b-card-text
                  .row
                    .col
                      span Security Type: {{ offering.securityType }}
                      br
                      span Raising: {{ offering.goal.min | currencyDisplayFormat }} - {{ offering.goal.max | currencyDisplayFormat }}
                    .col
                      span Raised: #[strong {{ offering.totalInvested | asCurrency }}]
                      br
                      span # Investments: #[strong {{ offering.totalInvestments }}]
                      br
                      span Days Left: {{ offering.date.end | timeDistance }}
                  .text-dark.text-decoration-none(v-if="offering.agreements.offering.url")
                    br
                    b-link(:src="offering.agreements.offering.url") Offering Agreement
                  .text-dark.text-decoration-none(v-if="offering.agreements.subscription.url")
                    br
                    b-link(:src="offering.agreements.subscription.url") Subscription Agreement
            b-button.mt-2.btn__gold(
              block
              size="lg"
              :to="signedIn ? `/c/${$route.params.companyId}/invest` : '/auth/login'"
            ) {{ signedIn ? "Invest Now" : "Login to Invest" }}
            .row.py-3
              .col
                small Share this offering with your friends!
                  a.pl-3.pr-2.text-muted(
                    :href="`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwunderfund.co%2Fc%2F${$route.params.companyId}`"
                    target="_blank"
                  )
                    font-awesome-icon.fa-lg(:icon="['fab', 'facebook-square']")
                  a.px-2.text-muted(
                    :href="`https://www.linkedin.com/shareArticle/?mini=true&url=wunderfund.co%2Fc%2F${$route.params.companyId}&title=I%20invested%20in%20${company.name.short}!`"
                    target="_blank"
                  )
                    font-awesome-icon.fa-lg(:icon="['fab', 'linkedin']")
                  a.pl-2.text-muted(
                    :href="`https://twitter.com/intent/tweet?url=wunderfund.co%2Fc%2F${$route.params.companyId}&text=I%20invested%20in%20${company.name.short}!`"
                    target="_blank"
                  )
                    font-awesome-icon.fa-lg(:icon="['fab', 'twitter-square']")
    section-testimonial
    section#content
      .container
        .row.pt-5
          .col
            .text-center
            h1.pb-3 The Pitch
            div(v-html="company.otherContent")
        .row.pt-5
          .col
            h1.pb-3 The Team
            .row
              .col-12.col-md-3.col-sm-6.py-3(
                v-for="(employee, idx) in company.employees"
                :key="idx"
              )
                b-card(no-body style="border:none")
                  .text-center.py-3
                    b-avatar(
                      :src="employee.image.url"
                      rounded="sm"
                      size="8rem"
                    )
                    b-card-text.pt-3.mb-0 {{ employee.name }}
                    small.text-muted.mb-0 {{ employee.title }}
        .row.pt-5
          .col
            h1.pb-5 FAQs
            details(v-for="(faq, index) in company.faqs" :key="index" open)
              summary {{ faq.question }}
              p.py-3 {{ faq.answer }}
        .row.py-5
          .col
            h1.pb-5 Questions or Comments?
            #campaign-items.mb-5
              comment-item(
                v-for="(comment, index) in comments"
                :key="index"
                :comment="comment"
              )
            #campaign-form.mb-5
              comment-form(v-if="signedIn")
              p(v-else) #[nuxt-link(to="/auth/login") Log in] or #[nuxt-link(to="/auth/register") Sign up] to comment!
</template>

<script>
import { mapGetters } from "vuex";
import CommentItem from "@/components/Campaign/CommentItem";
import CommentForm from "@/components/Campaign/CommentForm";
import SectionTestimonial from "@/components/Campaign/SectionTestimonial";

export default {
  components: {
    CommentItem,
    CommentForm,
    SectionTestimonial
  },
  data() {
    return {
      index: 0
    };
  },
  computed: {
    ...mapGetters({
      company: "company/company",
      comments: "company/comments",
      offerings: "company/offerings",
      signedIn: "auth/currentUserAuth",
      accredited: "user/accredited"
    })
  },
  methods: {
    setIndex(i) {
      this.index = i;
    },
    iconIt(platform) {
      switch (platform) {
        case "https://instagram.com":
          return "instagram";
        case "https://facebook.com":
          return "facebook-square";
        case "https://youtube.com":
          return "youtube";
        case "https://twitter.com":
          return "twitter";
        case "https://linkedin.com/company":
          return "linkedin";
        default:
          return "google";
      }
    }
  }
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
