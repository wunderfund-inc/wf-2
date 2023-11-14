<template>
  <main>
    <div class="container py-5 mx-auto">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <h1 class="pb-4 text-center">Register</h1>

          <section-social-media-login />

          <div class="row text-center justify-content-center py-3">
            <span>or</span>
          </div>

          <registration-form />

          <small class="text-muted">
            Already registered?
            <nuxt-link to="/auth/login">Log In</nuxt-link>
          </small>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SectionSocialMediaLogin from "@/components/SectionSocialMediaLogin";
import RegistrationForm from "@/components/RegistrationForm";

export default {
  components: {
    SectionSocialMediaLogin,
    RegistrationForm,
  },
  asyncData({ store, redirect }) {
    const loggedIn = store.state.auth.email;
    if (loggedIn) {
      return redirect("/account");
    }
  },
};
</script>
