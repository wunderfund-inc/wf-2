<template lang="pug">
  main
    b-container.py-5.text-center.mx-auto
      b-row
        b-col.d-none.d-md-block
        b-col
          h1.pb-4 Log In
          section-social-media-login
          hr.py-3
          login-form
        b-col.d-none.d-md-block
</template>

<script>
import SectionSocialMediaLogin from "@/components/Auth/SectionSocialMediaLogin";
import LoginForm from "@/components/Auth/LoginForm";

export default {
  components: {
    SectionSocialMediaLogin,
    LoginForm
  }
};
</script>
