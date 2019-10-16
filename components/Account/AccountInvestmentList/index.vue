<template lang="pug">
  b-card(no-body)
    b-card-body
      h1.mb-0 My Investments:
    b-list-group(flush)
      b-list-group-item(
        v-for="(investment, index) in 3"
        :key="index"
      )
        account-investment-item
</template>

<script>
import AccountInvestmentItem from "@/components/Account/AccountInvestmentItem";

export default {
  components: {
    AccountInvestmentItem
  }
};
</script>
