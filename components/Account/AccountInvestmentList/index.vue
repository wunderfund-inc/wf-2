<template lang="pug">
  b-card(no-body)
    b-card-body.px-0
      b-container
        h1.mb-0 My investments
      b-card-text.mt-3.mb-0.px-3(v-if="investments.length === 0") It doesn't look like you've made any investments yet.
    b-list-group(flush)
      b-list-group-item(
        v-for="(investment, index) in investments"
        :key="index"
      )
        account-investment-item(:investment="investment")
</template>

<script>
import { mapGetters } from "vuex";
import AccountInvestmentItem from "@/components/Account/AccountInvestmentItem";

export default {
  components: {
    AccountInvestmentItem
  },
  computed: {
    ...mapGetters({
      investments: "user/investments"
    })
  }
};
</script>
