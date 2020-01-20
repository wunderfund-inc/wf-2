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
              .col.text-right
                small.px-1(v-if="company.website")
                  a.text-muted(:href="company.website" target="_blank")
                    font-awesome-icon(:icon="['fas', 'link']")
                small.px-1(
                  v-for="(link, index) in company.socialMediaLinks"
                  :key="index"
                )
                  a.text-muted(
                    :href="`${link.platform}/${link.handle}`"
                    target="_blank"
                  )
                    font-awesome-icon(:icon="['fab', iconIt(link.platform)]")
          .col-12.col-md-5
            h1 {{ company.name.short }}
            h4 {{ company.motto }}
            h6.text-muted
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
                      span Raising: {{ offering.goal.min }} - {{ offering.goal.max }}
                      br
                      span Days Left: {{ 40 }}
            p Share this offering with your friends!
            p
              a.pr-3.text-muted
                font-awesome-icon.fa-2x(:icon="['fab', 'facebook-square']")
              a.px-3.text-muted
                font-awesome-icon.fa-2x(:icon="['fab', 'linkedin']")
              a.pl-3.text-muted
                font-awesome-icon.fa-2x(:icon="['fab', 'twitter-square']")
    section#metrics
      .container
        .row.text-center(v-if="company.offerings.length > 0")
          b-col.py-4(sm="4")
            h4 Amount Raised:
            span $0.00
          b-col.py-4(sm="4")
            h4 Investments:
            span 0
          b-col.py-4(sm="4")
            b-button.mt-2(
              v-if="!signedIn"
              size="lg"
              to="/auth/login"
            ) Login to Invest
            b-button.mt-2(
              v-if="signedIn && company.offerings[index] && company.offerings[index].securityType !== 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.id}/invest`"
            ) Invest {{ company.offerings[index].minInvestment | asCurrency }} Minimum
            b-button.mt-2(
              v-if="signedIn && company.offerings[index] && company.offerings[index].securityType === 'EQUITY'"
              size="lg"
              :to="`/c/${$route.params.id}/invest`"
              :disabled="!accredited"
            ) Invest {{ company.offerings[index] && company.offerings[index].equity.minSharesNeededToBuy * company.offerings[index].equity.pricePerShare | asCurrency }} Minimum
            br
            small.text-muted(
              v-if="signedIn && !accredited && company.offerings[index] && company.offerings[index].offeringType !== 'CF'"
            ) Why can't I invest in this offering?
    section#content
      .container.pt-4
        b-tabs(justified)
          b-tab(
            title="The Story"
            :disabled="company.otherContent === null"
            active
          )
            .container.py-5
              .row
                .col(v-html="company.otherContent")
          b-tab(title="FAQs" :disabled="company.faqs.length === 0")
            .container.py-5
              .row.row-cols-1
                .col-3
                .col-12.col-md-6
                  details(v-for="(faq, index) in company.faqs" :key="index")
                    summary {{ faq.question }}
                    p {{ faq.answer }}
                .col-3
          b-tab(title="The Team" :disabled="company.employees.length === 0")
            .container.py-5
              .row.row-cols-1
                .col-3
                .col-12.col-md-6
                  .row.py-3(
                    v-for="(employee, idx) in company.employees"
                    :key="idx"
                  )
                    .col.text-right
                      b-img(
                        thumbnail
                        style="max-height: 100px; max-width: 100px"
                        :src="employee.image.url"
                      )
                    .col
                      h4.mt-4 {{ employee.name }}
                      p {{ employee.title }}
                .col-3
          b-tab(title="Questions?" disabled)
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
