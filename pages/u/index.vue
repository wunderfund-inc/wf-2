<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col(sm="3" align-self="start")
          account-sidebar
        b-col(sm="9" align-self="end")
          account-spend-limit-card
          account-investment-list
</template>

<script>
import AccountSidebar from "@/components/Account/AccountSidebar";
import AccountSpendLimitCard from "@/components/Account/AccountSpendLimitCard";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";

export default {
  components: {
    AccountSidebar,
    AccountSpendLimitCard,
    AccountInvestmentList
  }
};
</script>
