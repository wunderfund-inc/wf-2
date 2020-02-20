<template lang="pug">
  main
    .container.py-5
      .row
        .col-12.col-md-8
          checkout-form
        .col-12.col-md-4
          checkout-summary
</template>

<script>
import { db } from "@/plugins/firebase";
import CheckoutForm from "@/components/Form/Checkout/CheckoutForm";
import CheckoutSummary from "@/components/Form/Checkout/CheckoutSummary";

export default {
  middleware: "authenticated",
  components: {
    CheckoutForm,
    CheckoutSummary
  },
  async fetch({ store, params }) {
    try {
      const authData = store.getters["auth/currentUserAuth"];
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
      await store.dispatch("company/fetchCompany", params.companyId);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
