<template lang="pug">
  main.py-5
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
          .col-12.col-md-5
            h1 {{ company.name.short }}
            h4 {{ company.motto }}
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
            b-card.my-3(no-body)
              b-tabs(card justified)
                b-tab(
                  v-for="(offering, key) in offerings"
                  :key="key"
                  :title="`Reg. ${offering.offeringType}`"
                  :active="key === index"
                  @click="setIndex(key)"
                )
                  b-card-text Security: {{ offering.securityType }}
                    br
                    span Raising: {{ offering.goal.min | currencyDisplayFormat }} - {{ offering.goal.max | currencyDisplayFormat }}
                    br
                    span Days Left: {{ offering.date.end | timeDistance }}
                    .text-dark(v-if="offering.agreements.offering.url")
                      br
                      b-link(:src="offering.agreements.offering.url || '#'") Offering Agreement
                    .text-dark(v-if="offering.agreements.subscription.url")
                      br
                      b-link(:src="offering.agreements.subscription.url || '#'") Subscription Agreement
            small Share this offering with your friends!
              a.pl-3.pr-2.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'facebook-square']")
              a.px-2.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'linkedin']")
              a.pl-2.text-muted
                font-awesome-icon.fa-lg(:icon="['fab', 'twitter-square']")
    section#metrics.bg-light
      .container
        .row.text-center.py-md-5(v-if="offerings.length > 0")
          b-col.py-4(sm="4")
            h5.text__gold-dark Amount Raised:
            span {{ offerings[index].totalInvested | asCurrency }}
          b-col.py-4(sm="4")
            h5.text__gold-dark Investments:
            span {{ offerings[index].totalInvestments }}
          b-col.py-4(sm="4")
            b-button.mt-2.btn__gold(
              v-if="!signedIn"
              size="lg"
              to="/auth/login"
            ) Login to Invest
            b-button.mt-2.btn__gold(
              v-if="signedIn && offerings[index] && offerings[index].securityType !== 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.companyId}/invest`"
            ) Invest {{ offerings[index].minInvestment | asCurrency }} Minimum
            b-button.mt-2.btn__gold(
              v-if="signedIn && offerings[index] && offerings[index].securityType === 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.companyId}/invest`"
              :disabled="!accredited"
            ) Invest {{ offerings[index] && offerings[index].equity.minSharesNeededToBuy * offerings[index].equity.pricePerShare | asCurrency }} Minimum
            br
            small.text-muted(
              v-if="signedIn && !accredited && offerings[index] && offerings[index].offeringType !== 'CF'"
            ) Why can't I invest in this offering?
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
              .col-12.col-md-3.col-sm-6.py-3(v-for="(employee, idx) in company.employees" :key="idx")
                b-card(no-body style="border:none")
                  .text-center.py-3
                    b-img(
                      thumbnail
                      :src="employee.image.url"
                      style="max-height: 100px; max-width: 100px"
                    )
                    b-card-text.pt-3.mb-0 {{ employee.name }}
                    small.text-muted.mb-0 {{ employee.title }}
        .row.pt-5
          .col
            h1.pb-3 FAQs
            details(v-for="(faq, index) in company.faqs" :key="index")
              summary {{ faq.question }}
              p {{ faq.answer }}
        .row.py-5
          .col
            h1 Questions?
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
