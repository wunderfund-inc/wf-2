<template lang="pug">
  main
    b-container.py-5.mx-auto
      b-row
        b-col.d-none.d-md-block
        b-col
          h1.pb-4.text-center Log In
          section-social-media-login
          hr.py-3
          login-form
          small.text-muted Don't have an account?
            |
            |
            nuxt-link(to="/auth/register") Register
        b-col.d-none.d-md-block
</template>

<script>
import SectionSocialMediaLogin from "@/components/Form/Auth/SectionSocialMediaLogin";
import LoginForm from "@/components/Form/Auth/LoginForm";

export default {
  components: {
    SectionSocialMediaLogin,
    LoginForm
  }
};
</script>
