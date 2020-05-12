<template>
  <main class="container py-5">
    <h1 class="text-center mb-5">Account</h1>
    <div class="row justify-content-center">
      <aside class="col-12 col-md-3 mb-3">
        <b-list-group>
          <b-list-group-item
            v-for="(item, index) in sections"
            :key="index"
            @click="render(item)"
            :active="section === item"
            :class="section === item ? 'bg-success border-success' : ''"
            button
          >
            {{ item | properCase }}
          </b-list-group-item>
        </b-list-group>
      </aside>

      <template v-if="!emailVerified">
        <article class="col-12 col-md-9 mb-3">
          <section-verify-email />
        </article>
      </template>

      <template v-else>
        <article class="col-12 col-md-9 mb-3">
          <template v-if="section === 'profile'">
            <div class="row mb-4">
              <div class="col">
                <section-spend-limit />
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <b-card bg-variant="light" class="mb-4">
                  <div class="container">
                    <form-avatar />
                  </div>
                </b-card>
              </div>
              <div class="col-12 col-md-8">
                <b-card bg-variant="light" class="mb-4">
                  <profile-form />
                </b-card>
              </div>
            </div>
          </template>

          <template v-else-if="section === 'accreditation'">
            <div class="row mb-4">
              <b-jumbotron>
                <template v-slot:header>Accreditation</template>

                <template v-slot:lead>
                  This is a simple hero unit, a simple jumbotron-style component
                  for calling extra attention to featured content or
                  information.
                </template>

                <hr class="my-4" />

                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>

                <b-button variant="primary" href="#">Do Something</b-button>
                <b-button variant="success" href="#">
                  Do Something Else
                </b-button>
              </b-jumbotron>
            </div>
          </template>

          <template v-else-if="section === 'investments'">
            <div class="row mb-4">
              <b-jumbotron>
                <template v-slot:header>Investments</template>

                <template v-slot:lead>
                  This is a simple hero unit, a simple jumbotron-style component
                  for calling extra attention to featured content or
                  information.
                </template>

                <hr class="my-4" />

                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>

                <b-button variant="primary" href="#">Do Something</b-button>
                <b-button variant="success" href="#">
                  Do Something Else
                </b-button>
              </b-jumbotron>
            </div>
          </template>

          <template v-else-if="section === 'settings'">
            <div class="row mb-4">
              <div class="col-12">
                <b-card bg-variant="light">
                  <section-password-reset />
                </b-card>
              </div>
            </div>
          </template>
        </article>
      </template>
    </div>
  </main>
</template>

<script>
import SectionVerifyEmail from "@/components/Account/SectionVerifyEmail";
import SectionSpendLimit from "@/components/Account/SectionSpendLimit";
import ProfileForm from "@/components/Form/Profile/ProfileForm";
import FormAvatar from "@/components/Form/Profile/FormAvatar";
import SectionPasswordReset from "@/components/Account/SectionPasswordReset";

export default {
  middleware: ["authenticated"],
  components: {
    SectionVerifyEmail,
    SectionSpendLimit,
    ProfileForm,
    FormAvatar,
    SectionPasswordReset
  },
  data() {
    return {
      section: "profile",
      sections: ["profile", "accreditation", "investments", "settings"]
    };
  },
  computed: {
    emailVerified() {
      return this.$store.state.auth.emailVerified;
    }
  },
  async fetch() {
    try {
      const { userId } = this.$store.state.auth;
      await this.$store.dispatch("profile/fetch", userId);

      if (!this.$store.getters["profile/validAttestations"]) {
        return this.$nuxt.context.redirect("/auth/attest");
      }
    } catch (error) {
      throw Error(error);
    }
  },
  methods: {
    render(section) {
      this.section = section;
    }
  }
};
</script>
