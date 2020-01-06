<template lang="pug">
  main
    b-container.py-5
      section(v-if="loggedIn && emailVerified")
        account-profile
        account-entity-list(:entities="entities")
        account-investment-list(:investments="investments")
      section(v-else)
        section-verify-email
</template>

<script>
import { db } from "@/plugins/firebase";
import AccountProfile from "@/components/Account/AccountProfile";
import AccountEntityList from "@/components/Account/AccountEntityList";
import AccountInvestmentList from "@/components/Account/AccountInvestmentList";
import SectionVerifyEmail from "@/components/Account/SectionVerifyEmail";

// TODO: remove when we have a Store Action for this.
// import d from "@/components/Account/data.json";

export default {
  middleware: "authenticated",
  components: {
    AccountProfile,
    AccountEntityList,
    AccountInvestmentList,
    SectionVerifyEmail
  },
  computed: {
    entities() {
      return this.$store.getters["user/entities"];
    },
    investments() {
      return this.$store.getters["user/investments"];
    },
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
    emailVerified() {
      return this.$store.getters["auth/emailVerified"];
    }
  },
  async fetch({ store }) {
    const authData = store.getters["auth/currentUserAuth"];
    const uid = authData.uid || authData.user_id;
    const user = await db
      .collection("users")
      .doc(uid)
      .get();
    const userData = user.data();
    await store.dispatch("user/setCurrentUser", userData);
    await store.dispatch("user/setProfileNameAttribute", { ...userData.name });
    await store.dispatch("user/setProfileAddressAttribute", {
      ...userData.address
    });
  }
};
</script>
