<template>
  <main>
    <div class="container py-5 mx-auto">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <p>Please attest to the following:</p>
          <attest-form />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AttestForm from "@/components/AttestForm";

export default {
  components: { AttestForm },
  async asyncData({ store, redirect }) {
    try {
      const { userId } = store.state.auth;
      await store.dispatch("profile/fetch", userId);

      if (store.getters["profile/validAttestations"]) {
        return redirect("/account");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>
