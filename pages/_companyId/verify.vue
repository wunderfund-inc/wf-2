<template>
  <main>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center pb-5">Before you start investing...</h1>
          <b-jumbotron class="p-4">
            <template #lead>
              <span v-if="!validProfile">
                We need this form filled out to sign the agreement.
              </span>
              <span v-else>
                Check/update the information below before continuing:
              </span>
            </template>
            <profile-form>
              <div class="form-row">
                <div class="col">
                  <b-button
                    @click.prevent="submit"
                    variant="success"
                    class="px-4"
                  >
                    Continue
                  </b-button>
                </div>
              </div>
            </profile-form>
          </b-jumbotron>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProfileForm from "@/components/Form/Profile/ProfileForm";

export default {
  middleware: ["authenticated"],
  components: { ProfileForm },
  computed: {
    validProfile() {
      return this.$store.getters["profile/valid"];
    }
  },
  async asyncData({ store, redirect, route }) {
    const emailVerified = store.state.auth.emailVerified;
    if (!emailVerified) return redirect(`/account`);

    const userId = store.state.auth.userId;
    await store.dispatch("profile/fetch", userId);

    if (!store.getters["profile/validAttestations"]) {
      return redirect("/auth/attest");
    }

    if (store.getters["profile/valid"]) {
      return redirect(`/${route.params.companyId}/invest`);
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch("profile/update", {
        userId: this.$store.state.auth.userId,
        flag: "profile"
      });
      await this.$router.push(`/${this.$route.params.companyId}/invest`);
    }
  }
};
</script>
