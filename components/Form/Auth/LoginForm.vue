<template lang="pug">
section#manual-auth
  b-overlay(:show="showOverlay")
    template(#overlay)
      .d-flex.align-items-center
        b-spinner(small type="grow" variant="secondary")
        b-spinner(type="grow" variant="dark")
        b-spinner(small type="grow" variant="secondary")
        span.sr-only Please wait...
      .text-center
        p Logging in...
    b-card.my-2(no-body)
      b-card-body
        b-form#via-password(
          @submit.prevent="submitLoginForm"
          @keypress.enter.prevent="submitLoginForm"
        )
          b-form-group.text-left(
            label="Email Address"
            label-for="input-email"
          )
            b-form-input#input-email(
              type="email"
              v-model="email"
              trim
            )
          b-form-group.text-left(
            label="Password"
            label-for="input-password"
          )
            b-form-input#input-password(
              type="password"
              v-model="password"
              trim
            )
          b-button(
            type="submit"
            variant="primary"
            block
          ) Login
          p.text-danger.pt-3 {{ error }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  computed: {
    ...mapGetters(["showOverlay"])
  },
  methods: {
    async submitLoginForm() {
      try {
        await this.$store.dispatch("toggleOverlay", true);
        await this.$store.dispatch("auth/loginUser", {
          email: this.email,
          password: this.password
        });
        const userId = this.$store.getters["auth/userId"];
        await this.$store.dispatch("user/setAccountData", userId);
        await this.$store.dispatch("toggleOverlay", false);
        await this.$router.replace("/u");
      } catch (error) {
        await this.$store.dispatch("toggleOverlay", false);
        this.error = error.message;
      }
    }
  }
};
</script>
