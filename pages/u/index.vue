<template lang="pug">
  main
    b-container.py-5
      account-profile(
        :spend-pool="2000"
        :spend-max="2200"
        :is-accredited="false"
      )
      account-entity-list(:entities="entities")
      account-investment-list(:investments="investments")
</template>

<script>
import AccountProfile from "@/components/Account/AccountProfile";
import AccountEntityList from "@/components/Account/AccountEntityList";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";

// TODO: remove when we have a Store Action for this.
import d from "@/components/Account/data.json";

export default {
  middleware: "authenticated",
  components: {
    AccountProfile,
    AccountEntityList,
    AccountInvestmentList
  },
  data() {
    return {
      investments: d.investments,
      entities: d.entities
    };
  }
};
</script>
