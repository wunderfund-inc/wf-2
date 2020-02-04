<template lang="pug">
  main
    b-container.py-5
      section(v-if="emailVerified")
        account-profile
        account-entity-list(:entities="entities")
        account-investment-list(:investments="investments")
      section(v-else)
        section-verify-email
</template>

<script>
import { mapGetters } from "vuex";
import AccountProfile from "@/components/Account/AccountProfile";
import AccountEntityList from "@/components/Account/AccountEntityList";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";
import SectionVerifyEmail from "@/components/Account/SectionVerifyEmail";

export default {
  middleware: "authenticated",
  components: {
    AccountProfile,
    AccountEntityList,
    AccountInvestmentList,
    SectionVerifyEmail
  },
  computed: {
    ...mapGetters({
      entities: "user/entities",
      investments: "user/investments",
      emailVerified: "auth/emailVerified"
    })
  }
};
</script>
