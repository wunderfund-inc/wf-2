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
            to="/account/accreditation"
            :class="`list-group-item list-group-item-action list-group-item-${color}`"
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
                if you want to invest more than $2,200 annually, you're required
                to let us know that you qualify. Fill out the information below
                to update how much you're allowed to spend on our platform.
              </p>
              <p v-if="isEntity" class="small text-muted">
                *Your Entity is considered "<strong>accredited</strong>" if its
                Combined Revenue exceeds $1M <b>and</b> its Net Assets exceeds
                $5M.
              </p>
              <p v-else class="small text-muted">
                *You are considered an "<strong>accredited investor</strong>" if
                your Annual Income exceeds $200K <strong>and</strong> your Net
                Worth is over $1M.
              </p>
              <hr />

              <AccreditationForm :is-entity="isEntity" :ai="ai" :nw="nw" />
            </b-card>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import { doc, getDoc } from "firebase/firestore/lite";
import AccreditationForm from "@/components/AccreditationForm";
import { db } from "@/plugins/firebase";

export default {
  components: {
    AccreditationForm,
  },
  async asyncData({ store }) {
    try {
      const { userId } = store.state.auth;
      const docRef = doc(db, `users/${userId}`);
      const snapshot = await getDoc(docRef);
      const userData = snapshot.data();
      const {
        is_entity: isEntity,
        accreditation_ai: ai,
        accreditation_nw: nw,
      } = userData;
      return { user: userData, isEntity, ai, nw };
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
  },
};
</script>
