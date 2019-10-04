<template lang="pug">
  main
    b-container.py-5.text-center.mx-auto
      b-row
        b-col.d-none.d-md-block
        b-col
          b-form
            b-row.pb-4
              b-col.py-2(lg="4")
                b-button(
                  block
                  size="lg"
                  style="background-color: #4267b2; border: 1px solid #4267b2")
                  facebook-icon.d-none.d-md-block.mx-auto
                  span.d-inline.d-md-none Facebook
              b-col.py-2(lg="4")
                b-button(
                  block
                  size="lg"
                  style="background-color: #dd4b39; border: 1px solid #dd4b39")
                  facebook-icon.d-none.d-md-block.mx-auto
                  span.d-inline.d-md-none Google
              b-col.py-2(lg="4")
                b-button(
                  block
                  size="lg"
                  style="background-color: #38A1F3; border: 1px solid #38A1F3")
                  twitter-icon.d-none.d-md-block.mx-auto
                  span.d-inline.d-md-none Twitter
            b-form-group.text-left(
              label="Email Address"
              label-for="input-email"
              :invalid-feedback="invalidFeedback"
              :valid-feedback="validFeedback"
              :state="state"
            )
              b-form-input#input-email(
                type="email"
                v-model="email"
                :state="state"
                trim
              )
            b-form-group.text-left(
              label="Password"
              label-for="input-password"
              :invalid-feedback="invalidFeedback"
              :valid-feedback="validFeedback"
              :state="state"
            )
              b-form-input#input-password(
                type="password"
                v-model="password"
                :state="state"
                trim
              )
            button.btn.btn-lg.btn-primary.btn-block Sign in
        b-col.d-none.d-md-block
</template>

<script>
import { FacebookIcon, TwitterIcon } from "vue-feather-icons";

export default {
  components: {
    FacebookIcon,
    TwitterIcon
  },
  data() {
    return {
      logins: [
        {
          name: "Facebook",
          color: "4267b2",
          icon: ""
        },
        {
          name: "Google",
          color: "dd4b39",
          icon: ""
        },
        {
          name: "Twitter",
          color: "38A1F3",
          icon: ""
        }
      ]
    };
  }
};
</script>
