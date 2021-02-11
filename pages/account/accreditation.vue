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
                if you want to invest more than $2,200 annually on our platform,
                you're required to let us know that you qualify. Fill out the
                information below to update how much you're allowed to spend on
                our platform.
              </p>
              <p v-if="isEntity" class="small text-muted">
                *Your Entity is considered "accredited" if its Combined Revenue
                exceeds $1M <b>and</b> its Net Assets exceeds $5M.
              </p>
              <p v-else class="small text-muted">
                *You are considered an "accredited investor" if your Annual
                Income exceeds $200K <b>and</b> your Net Worth is over $1M.
              </p>
              <hr />

              <AccreditationForm />
            </b-card>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import AccreditationForm from "@/components/Form/Accreditation";

export default {
  components: {
    AccreditationForm,
  },
  computed: {
    ...mapState({
      isEntity: (state) => state.profile.is_entity,
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
