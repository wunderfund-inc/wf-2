<template lang="pug">
  b-card(no-body)
    b-card-body.px-0
      b-container
        h1.mb-4 My Investments
        .row
          .col
            account-investment-table(:investments="investments")
      b-card-text.mt-3.mb-0.px-3(v-if="investments.length === 0") It doesn't look like you've made any investments yet. #[b-link(to="/c") Browse for some!]
    //- b-list-group(flush)
    //-   b-list-group-item(
    //-     v-for="(investment, index) in investments"
    //-     :key="index"
    //-   )
    //-     account-investment-item(:investment="investment")
</template>

<script>
import { mapGetters } from "vuex";
import AccountInvestmentTable from "@/components/Account/AccountInvestmentTable";

export default {
  components: {
    AccountInvestmentTable
  },
  computed: {
    ...mapGetters({
      investments: "user/investments"
    })
  }
};
</script>
