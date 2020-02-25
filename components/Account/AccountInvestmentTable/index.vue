<template lang="pug">
table.table.mb-0
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
        p Goal: {{ investment.offering.goal.min | currencyDisplayFormat }} - {{ investment.offering.goal.max | currencyDisplayFormat }}
        p Raised So Far: {{ investment.offering.totalInvested | asCurrency }}
        p.mb-0 Time Left: {{ investment.offering.date.end | timeDistance }}
      td
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
</template>

<script>
export default {
  props: {
    investments: {
      type: Array,
      default() {},
      required: true
    }
  }
};
</script>
