<template lang="pug">
  main
    .container.py-5.mx-auto
      .row
        .col-12.col-md-4.offset-md-4
          h1.pb-4.text-center Register
          section-social-media-login
          p.text-danger {{ socialMediaError }}
          b-row
            b-col(cols="5")
              hr.py-3
            b-col.text-center.pt-1(cols="2")
              span or
            b-col(cols="5")
              hr.py-3
          registration-form
          small.text-muted Already registered? #[nuxt-link(to="/auth/login") Log In]
</template>

<script>
import SectionSocialMediaLogin from "@/components/Form/Auth/SectionSocialMediaLogin";
import RegistrationForm from "@/components/Form/Auth/RegistrationForm";

export default {
  components: {
    SectionSocialMediaLogin,
    RegistrationForm
  },
  computed: {
    socialMediaError() {
      return this.$store.getters.socialMediaError;
    }
  }
};
</script>
