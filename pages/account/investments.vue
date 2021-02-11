<template>
  <main class="container py-5">
    <h1 class="text-center mb-5">Account</h1>
    <div class="row justify-content-center">
      <aside class="col-12 col-md-3 mb-3">
        <div class="list-group">
          <NuxtLink
            to="/account"
            class="list-group-item list-group-item-action"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/account/profile"
            class="list-group-item list-group-item-action"
          >
            Profile
          </NuxtLink>
          <NuxtLink
            to="/account/accreditation"
            class="list-group-item list-group-item-action"
          >
            Accreditation
          </NuxtLink>
          <NuxtLink
            to="/account/investments"
            :class="`list-group-item list-group-item-action list-group-item-${color}`"
          >
            Investments
          </NuxtLink>
          <NuxtLink
            to="/account/settings"
            class="list-group-item list-group-item-action"
          >
            Settings
          </NuxtLink>
        </div>
      </aside>
      <article class="col-12 col-md-9 mb-3">
        <div class="row mb-4">
          <div class="col">
            <b-card v-if="investments.length > 0" no-body>
              <template v-slot:header>
                <h6 class="mb-0 text-center">Investments</h6>
              </template>
              <InvestmentsTable :investments="investments" />
            </b-card>
            <div v-else>No Investments to show.</div>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import InvestmentsTable from "@/components/Account/InvestmentsTable";

export default {
  components: {
    InvestmentsTable,
  },
  async asyncData({ store, redirect, query }) {
    try {
      const { userId } = store.state.auth;
      // await store.dispatch("profile/fetch", userId);
      await store.dispatch("investments/fetch", userId);

      return { investmentMade: !!query.event };
    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
    ...mapState({
      investments: (state) => state.investments.investments,
    }),
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
};
</script>
