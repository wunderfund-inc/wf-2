<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col(md="8")
          checkout-form
        b-col(md="4")
          checkout-summary
</template>

<script>
import { db } from "@/plugins/firebase";
import CheckoutForm from "@/components/Form/Checkout/CheckoutForm";
import CheckoutSummary from "@/components/Form/Checkout/CheckoutSummary";

export default {
  components: {
    CheckoutForm,
    CheckoutSummary
  },
  async fetch({ store }) {
    // Fetch company data, set to store
    await store.dispatch("company/GET_OFFERINGS");

    // Fetch user auth data
    const authData = store.getters["auth/currentUserAuth"];

    // Fetch user db data, set to store
    const uid = authData.uid || authData.user_id;
    const user = await db
      .collection("users")
      .doc(uid)
      .get();
    await store.dispatch("user/setCurrentUser", user.data());
  }
};
</script>
