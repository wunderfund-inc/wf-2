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
            class="list-group-item list-group-item-action"
          >
            Investments
          </NuxtLink>
          <NuxtLink
            to="/account/settings"
            :class="`list-group-item list-group-item-action list-group-item-${color}`"
          >
            Settings
          </NuxtLink>
        </div>
      </aside>
      <article class="col-12 col-md-9 mb-3">
        <div class="row mb-4">
          <div class="col">
            <b-card bg-variant="light">
              <PasswordReset />
            </b-card>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import PasswordReset from "@/components/Account/SectionPasswordReset";

export default {
  components: {
    PasswordReset,
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
