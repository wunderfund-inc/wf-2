<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col.d-none.d-md-block(md="3" align-self="start")
          account-sidebar
        b-col(md="9" align-self="end")
          account-spend-limit-card(:spend-pool="2200" :spend-max="2200")
          account-investment-list(:investments="investments")
</template>

<script>
import AccountSidebar from "@/components/Account/AccountSidebar";
import AccountSpendLimitCard from "@/components/Account/AccountSpendLimitCard";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";

// TODO: remove when we have a Store Action for this.
import d from "@/components/Account/data.json";

export default {
  components: {
    AccountSidebar,
    AccountSpendLimitCard,
    AccountInvestmentList
  },
  data() {
    return {
      investments: d.investments
    };
  }
};
</script>
