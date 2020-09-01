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
            <div class="col">
              <b-card bg-variant="light">
                <h3>Accreditation</h3>
                <p class="text-muted">
                  Based on the
                  <b-link
                    href="https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/updated-investor-bulletin-accredited-investors"
                    target="_blank"
                  >
                    SEC standards
                  </b-link>
                  if you want to invest more than $2,200 annually on our
                  platform, you're required to let us know that you qualify.
                  Fill out the information below to update how much you're
                  allowed to spend on our platform.
                </p>
                <p v-if="isEntity" class="small text-muted">
                  *Your Entity is considered "accredited" if its Combined
                  Revenue exceeds $1M <b>and</b> its Net Assets exceeds $5M.
                </p>
                <p v-else class="small text-muted">
                  *You are considered an "accredited investor" if your Annual
                  Income exceeds $200K <b>and</b> your Net Worth is over $1M.
                </p>
                <hr />
                <accreditation-form />
              </b-card>
            </div>
          </div>
        </template>

        <template v-else-if="section === 'investments'">
          <div class="row mb-4">
            <div class="col">
              <b-card v-if="investments.length > 0" no-body>
                <template v-slot:header>
                  <h6 class="mb-0 text-center">Investments</h6>
                </template>
                <investments-table :investments="investments" />
              </b-card>
              <div v-else>No Investments</div>
            </div>
          </div>
        </template>

        <template v-else-if="section === 'settings'">
          <div class="row mb-4">
            <div class="col">
              <b-card bg-variant="light">
                <section-password-reset />
              </b-card>
            </div>
          </div>
        </template>
      </article>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import SectionSpendLimit from "@/components/Account/SectionSpendLimit";
import ProfileForm from "@/components/Form/Profile/ProfileForm";
import FormAvatar from "@/components/Form/Profile/FormAvatar";
import AccreditationForm from "@/components/Form/Accreditation";
import InvestmentsTable from "@/components/Account/InvestmentsTable";
import SectionPasswordReset from "@/components/Account/SectionPasswordReset";

export default {
  middleware: ["authenticated"],
  components: {
    SectionSpendLimit,
    ProfileForm,
    FormAvatar,
    AccreditationForm,
    InvestmentsTable,
    SectionPasswordReset
  },
  data() {
    return {
      section: "profile",
      sections: ["profile", "accreditation", "investments", "settings"]
    };
  },
  computed: {
    ...mapState({
      emailVerified: state => state.auth.emailVerified,
      isEntity: state => state.profile.is_entity,
      investments: state => state.investments.investments
    })
  },
  async asyncData({ store, redirect }) {
    try {
      const { userId } = store.state.auth;
      await store.dispatch("profile/fetch", userId);

      if (!store.getters["profile/validAttestations"]) {
        return redirect("/auth/attest");
      }

      await store.dispatch("investments/fetch", userId);
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
