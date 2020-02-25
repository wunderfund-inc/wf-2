<template lang="pug">
table.table.text-center
  thead
    tr
      th(scope="col") Company
      th(scope="col") Invested
      th(scope="col") Method
      th(scope="col") Date Invested
      th(scope="col") Raised
      th(scope="col") Goal
      th(scope="col") Status
      th(scope="col") Actions
  tbody
    tr(v-for="(investment, index) in investments" :key="investment")
      th(scope="row")
        b-img(
          v-if="investment.company.logo.url"
          :src="investment.company.logo.url"
          thumbnail
          width="25"
        )
        span.ml-2 {{ investment.company.name.short }} (Reg. {{ investment.offering.offeringType }})
      td {{ investment.amount | asCurrency }}
      td {{ investment.method }}
      td {{ investment.createdAt.seconds | dateFromSeconds }}
      td {{ investment.offering.totalInvested | asCurrency }}
      td {{ investment.offering.goal.min | currencyDisplayFormat }} - {{ investment.offering.goal.max | currencyDisplayFormat }}
      td {{ investment.offering.date.end | timeDistance }} left
      td Download Cancel
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
