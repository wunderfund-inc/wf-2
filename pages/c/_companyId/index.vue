<template lang="pug">
  main#campaign
    campaign-content#campaign-content
</template>

<script>
import { db } from "@/plugins/firebase";
import CampaignContent from "@/components/Campaign/Content";

export default {
  components: {
    CampaignContent
  },
  async fetch({ store, params }) {
    try {
      const authData = store.getters["auth/currentUserAuth"];

      if (authData) {
        const uid = authData.uid || authData.user_id;
        const user = await db
          .collection("users")
          .doc(uid)
          .get();
        const userData = user.data();
        await store.dispatch("user/setCurrentUser", userData);
        await store.dispatch("user/setProfileNameAttribute", {
          ...userData.name
        });
        await store.dispatch("user/setProfileAddressAttribute", {
          ...userData.address
        });
      }

      await store.dispatch("company/fetchCompany", params.companyId);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
