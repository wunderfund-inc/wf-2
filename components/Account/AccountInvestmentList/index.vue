<template lang="pug">
  section
    h1.py-3 My Investment Summaries:
    account-investment-item
    account-investment-item
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
