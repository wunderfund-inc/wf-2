<template lang="pug">
main
  .container.py-5.mx-auto
    .row
      .col-12.col-md-6.offset-md-3
        h1.pb-4.text-center Log In
        //- section-social-media-login
        //- b-row
          b-col(cols="5")
            hr.py-3
          b-col.text-center.pt-1(cols="2")
            span or
          b-col(cols="5")
            hr.py-3
        login-form
        small.text-muted Don't have an account? #[nuxt-link(to="/auth/register") Make one!]
</template>

<script>
// import SectionSocialMediaLogin from "@/components/Form/Auth/SectionSocialMediaLogin";
import LoginForm from "@/components/Form/Auth/LoginForm";

export default {
  components: {
    // SectionSocialMediaLogin,
    LoginForm
  }
};
</script>
