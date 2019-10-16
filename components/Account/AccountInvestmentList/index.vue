<template lang="pug">
  b-card(no-body)
    b-card-body
      h1.mb-0 My Investments:
    b-list-group(flush)
      b-list-group-item(
        v-for="(investment, index) in investments"
        :key="index"
      )
        account-investment-item(:investment="investment")
</template>

<script>
import d from "./data.json";
import AccountInvestmentItem from "@/components/Account/AccountInvestmentItem";

export default {
  components: {
    AccountInvestmentItem
  },
  data() {
    return {
      investments: d.investments
    };
  }
};
</script>
