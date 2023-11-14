<template>
  <main class="container py-5">
    <h1 class="text-center mb-5">Account</h1>
    <div class="row justify-content-center">
      <aside class="col-12 col-md-3 mb-3">
        <div class="list-group">
          <NuxtLink
            to="/account"
            :class="`list-group-item list-group-item-action list-group-item-${color}`"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/account/accreditation"
            class="list-group-item list-group-item-action"
          >
            Accreditation
          </NuxtLink>
          <NuxtLink
            to="/account/investments"
            class="list-group-item list-group-item-action"
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
        <b-alert v-if="action === 'accreditation_updated'" show dismissible>
          Accreditation information updated. See below to check how much you may
          invest on our platform.
        </b-alert>
        <b-alert v-if="action === 'profile-updated'" show dismissible>
          Profile information updated.
        </b-alert>
        <SectionSpendLimit :limit="limit" :spent="spent" />
        <div class="card bg-light mb-4">
          <h4 class="card-body pb-1">Heads Up!</h4>
          <p class="card-body py-0">
            You will need everything below in order to invest on our platform.
            Save some time by filling it out now!
          </p>
          <p class="card-body mb-0 py-0">
            Please fill this out as if you're filling out a tax form.
          </p>
          <hr />
          <div class="card-body">
            <ProfileForm :user="user" />
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import SectionSpendLimit from "@/components/Account/SectionSpendLimit";
import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { calculatePersonalLimit } from "@/helpers/finance";
import { db } from "@/plugins/firebase";

export default {
  components: {
    SectionSpendLimit,
    ProfileForm,
  },
  middleware: ["authenticated"],
  async asyncData({ store }) {
    try {
      const { userId } = store.state.auth;
      const userDocument = await db.collection("users").doc(userId).get();
      const userData = userDocument.data();
      const limit = calculatePersonalLimit(
        userData.accreditation_ai || 0,
        userData.accreditation_nw || 0
      );
      await store.dispatch("investments/fetch", userId);
      const spent = store.getters["investments/spent"];
      return { user: userData, limit, spent };
    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
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
    action() {
      return this.$route.query.action;
    },
  },
};
</script>
