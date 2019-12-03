<template lang="pug">
  main
    b-container.py-5.mx-auto
      b-row
        b-col.d-none.d-md-block
        b-col
          h1.pb-4.text-center Register
          section-social-media-login
          b-row
            b-col(cols="5")
              hr.py-3
            b-col.text-center.pt-1(cols="2")
              span or
            b-col(cols="5")
              hr.py-3
          registration-form
          small.text-muted Already registered?
            |
            |
            nuxt-link(to="/auth/login") Log In
        b-col.d-none.d-md-block
</template>

<script>
import SectionSocialMediaLogin from "@/components/Form/Auth/SectionSocialMediaLogin";
import RegistrationForm from "@/components/Form/Auth/RegistrationForm";

export default {
  components: {
    SectionSocialMediaLogin,
    RegistrationForm
  }
};
</script>
