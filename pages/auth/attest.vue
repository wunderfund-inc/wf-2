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
import AttestForm from "@/components/Form/Auth/AttestForm";

export default {
  components: { AttestForm },
  async fetch() {
    try {
      const { userId } = this.$store.state.auth;
      await this.$store.dispatch("profile/fetch", userId);

      if (this.$store.getters["profile/validAttestations"]) {
        return this.$nuxt.context.redirect("/account");
      }
    } catch (error) {
      throw Error(error);
    }
  }
};
</script>
