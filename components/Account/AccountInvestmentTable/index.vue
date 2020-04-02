<template lang="pug">
div
  table.table.mb-0(v-if="investments.length > 0")
    thead
      tr
        th(scope="col") Company
        th(scope="col") Offering Details
        th(scope="col") Investment Details
        th(scope="col") Actions
    tbody
      tr(v-for="(investment, index) in investments" :key="index")
        th(scope="row")
          b-img(
            v-if="investment.company.logo.url"
            :src="investment.company.logo.url"
            thumbnail
            width="50"
          )
          span.ml-2 {{ investment.company.name.short }} (Reg. {{ investment.offering.offeringType }})
        td
          p Security Type: {{ investment.offering.securityType }}
          p Goal: {{ investment.offering.goal.min | currencyDisplayFormat }} - {{ investment.offering.goal.max | currencyDisplayFormat }}
          p Raised So Far: {{ investment.offering.totalInvested | asCurrency }}
          p.mb-0 Time Left: {{ investment.offering.date.end | timeDistance }}
        td
          p Type of Investment: {{ investment.type === "ENTITY" ? `On behalf of ${companyName(investment.userId)}`: "Personal" }}
          p Date Invested: {{ investment.createdAt.seconds | dateFromSeconds }}
          p Amount Invested: {{ investment.amount | asCurrency }}
          p.mb-0 Method: {{ investment.method }}
        td.text-left
          b-link.text-success(href="https://google.com" target="_blank")
            font-awesome-icon.mx-2(:icon="['fas', 'file-pdf']")
            span Download
          br
          b-link.text-danger(href="mailto:taylor@wunderfund.co")
            font-awesome-icon.mx-2(:icon="['fas', 'minus-circle']")
            span Cancel
  b-card-text.mt-3.mb-0(v-else) It doesn't look like you've made any investments yet. #[b-link(to="/c") Browse for some!]
</template>

<script>
export default {
  props: {
    investments: {
      type: Array,
      default() {},
      required: true
    }
  },
  methods: {
    companyName(id) {
      const entities = this.$store.getters["user/entities"];
      const item = entities.filter(investment => {
        return investment.userId === id;
      });
      return item[0].name;
    }
  }
};
</script>
