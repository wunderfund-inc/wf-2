<template lang="pug">
  main
    b-container.py-5
      section(v-if="loggedIn && emailVerified")
        account-profile(
          :spend-pool="2000"
          :spend-max="2200"
          :is-accredited="false"
        )
        account-entity-list(:entities="entities")
        account-investment-list(:investments="investments")
      section(v-else)
        section-verify-email
</template>

<script>
import AccountProfile from "@/components/Account/AccountProfile";
import AccountEntityList from "@/components/Account/AccountEntityList";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";
import SectionVerifyEmail from "@/components/Account/SectionVerifyEmail";

// TODO: remove when we have a Store Action for this.
import d from "@/components/Account/data.json";

export default {
  middleware: "authenticated",
  components: {
    AccountProfile,
    AccountEntityList,
    AccountInvestmentList,
    SectionVerifyEmail
  },
  data() {
    return {
      investments: d.investments,
      entities: d.entities
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
    emailVerified() {
      return this.$store.getters["auth/emailVerified"];
    }
  }
};
</script>
