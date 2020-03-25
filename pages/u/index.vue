<template lang="pug">
  main
    b-container.py-5
      b-alert.pb-0(
        v-if="investmentEvent"
        variant="success"
        show
        dismissible
        fade
      )
        h4 Success!
        p Thanks for investing! Please check your email for a receipt of the agreement you've signed and details regarding your investment.
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
    }),
    investmentEvent() {
      return (
        this.$route.query.event && this.$route.query.event === "investment"
      );
    }
  },
  async created() {
    try {
      if (this.investmentEvent) {
        await this.$store.dispatch("checkout/submitInvestmentFromCookie");
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
