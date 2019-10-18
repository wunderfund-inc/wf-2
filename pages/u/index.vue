<template lang="pug">
  main
    b-container.py-5
      account-profile(:spend-pool="2000" :spend-max="2200")
      //- account-spend-limit-card(:spend-pool="2200" :spend-max="2200")
      account-investment-list(:investments="investments")
</template>

<script>
// import AccountSidebar from "@/components/Account/AccountSidebar";
// import AccountSpendLimitCard from "@/components/Account/AccountSpendLimitCard";
import AccountProfile from "@/components/Account/AccountProfile";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";

// TODO: remove when we have a Store Action for this.
import d from "@/components/Account/data.json";

export default {
  components: {
    // AccountSidebar,
    // AccountSpendLimitCard,
    AccountProfile,
    AccountInvestmentList
  },
  data() {
    return {
      investments: d.investments
    };
  }
};
</script>
