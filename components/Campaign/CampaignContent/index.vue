<template lang="pug">
  main
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
              .col.pt-2
                small.px-1(v-if="company.website")
                  a.text-muted(:href="company.website" target="_blank")
                    font-awesome-icon.fa-lg(:icon="['fas', 'link']")
                small.px-1(
                  v-for="(link, index) in company.socialMediaLinks"
                  :key="index"
                )
                  a.text-muted(
                    :href="`${link.platform}/${link.handle}`"
                    target="_blank"
                  )
                    font-awesome-icon.fa-lg(:icon="['fab', iconIt(link.platform)]")
          .col-12.col-md-5
            h1 {{ company.name.short }}
            h4 {{ company.motto }}
            small.text-muted
              font-awesome-icon(:icon="['fas', 'map-marker-alt']")
              |
              | {{ company.location.city }}, {{ company.location.state }}
            b-card.my-3(no-body)
              b-tabs(card pills justified)
                b-tab(
                  v-for="(offering, key) in company.offerings"
                  :key="key"
                  :title="`Reg. ${offering.offeringType}`"
                  :active="key === index"
                  @click="setIndex(key)"
                )
                  b-card-text
                    p Security: {{ offering.securityType }}
                      br
                      span Raising: {{ offering.goal.min | currencyDisplayFormat }} - {{ offering.goal.max | currencyDisplayFormat }}
                      br
                      span Days Left: {{ offering.date.end | timeDistance }}
            small Share this offering with your friends!
              a.px-3.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'facebook-square']")
              a.px-3.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'linkedin']")
              a.pl-3.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'twitter-square']")
    section#metrics
      .container
        .row.text-center(v-if="company.offerings.length > 0")
          b-col.py-4(sm="4")
            h5 Amount Raised:
            span {{ amountRaised | asCurrency }}
          b-col.py-4(sm="4")
            h5 Investments:
            span {{ company.investments.length }}
          b-col.py-4(sm="4")
            b-button.mt-2(
              v-if="!signedIn"
              size="lg"
              to="/auth/login"
            ) Login to Invest
            b-button.mt-2(
              v-if="signedIn && company.offerings[index] && company.offerings[index].securityType !== 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.companyId}/invest`"
            ) Invest {{ company.offerings[index].minInvestment | asCurrency }} Minimum
            b-button.mt-2(
              v-if="signedIn && company.offerings[index] && company.offerings[index].securityType === 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.companyId}/invest`"
              :disabled="!accredited"
            ) Invest {{ company.offerings[index] && company.offerings[index].equity.minSharesNeededToBuy * company.offerings[index].equity.pricePerShare | asCurrency }} Minimum
            br
            small.text-muted(
              v-if="signedIn && !accredited && company.offerings[index] && company.offerings[index].offeringType !== 'CF'"
            ) Why can't I invest in this offering?
    section#content
      .container
        .row.pt-5
          .col-12.col-md-1
          .col
            .text-center
            h1.pb-3 The Pitch
            div(v-html="company.otherContent")
          .col-12.col-md-1
        .row.pt-5
          .col-12.col-md-1
          .col
            h1.pb-3 The Team
            .row
              .col-12.col-md-3.col-sm-6.py-3(v-for="(employee, idx) in company.employees" :key="idx")
                b-card(no-body style="border:none")
                  .text-center.py-3
                    b-img(
                      thumbnail
                      :src="employee.image.url"
                      style="max-height: 100px; max-width: 100px"
                    )
                    b-card-text.pt-3
                      h6.mb-0 {{ employee.name }}
                      small.text-muted.mb-0 {{ employee.title }}
          .col-12.col-md-1
        .row.pt-5
          .col-12.col-md-1
          .col
            h1.pb-3 FAQs
            details(v-for="(faq, index) in company.faqs" :key="index")
              summary {{ faq.question }}
              p {{ faq.answer }}
          .col-12.col-md-1
        .row.py-5
          .col-12.col-md-1
          .col
            h1 Questions?
          .col-12.col-md-1
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      index: 0
    };
  },
  computed: {
    ...mapGetters({
      company: "company/company",
      amountRaised: "company/amountRaised",
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
