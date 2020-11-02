<template>
  <main>
    <div class="container py-5 mx-auto">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <h1 class="pb-4 text-center">Log In</h1>

          <section-social-media-login />

          <div class="row text-center justify-content-center py-3">
            <span>or</span>
          </div>

          <login-form />

          <small class="text-muted">
            Don't have an account?
            <nuxt-link to="/auth/register">Make one!</nuxt-link>
          </small>
          <br />
          <small class="text-muted">
            Forget your password?
            <nuxt-link to="/auth/password-reset">Reset it!</nuxt-link>
          </small>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SectionSocialMediaLogin from "@/components/Form/Auth/SectionSocialMediaLogin";
import LoginForm from "@/components/Form/Auth/LoginForm";

export default {
  components: {
    SectionSocialMediaLogin,
    LoginForm,
  },
  asyncData({ store, redirect }) {
    const loggedIn = store.state.auth.email;
    if (loggedIn) {
      return redirect("/account");
    }
  },
};
</script>
