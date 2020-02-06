<template lang="pug">
  b-form#via-password(
    @submit.prevent="submitLogin"
    @keypress.enter.prevent="submitLogin"
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
      :disabled="submitting"
    )
      span.spinner-border.spinner-border-sm.mr-2(
        v-if="submitting"
        role="status"
        aria-hiden="true"
        style="margin-bottom: 4px"
      )
      span(v-if="submitting") Logging In...
      span(v-if="!submitting") Sign Up
    p.text-danger.pt-3 {{ error }}
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null,
      submitting: false
    };
  },
  methods: {
    toggleSubmission() {
      this.submitting = !this.submitting;
    },
    async submitLogin() {
      try {
        this.submitting = true;
        await this.$store.dispatch("auth/loginUser", {
          email: this.email,
          password: this.password
        });
        const userId = this.$store.getters["auth/userId"];
        await this.$store.dispatch("user/setAccountData", userId);
        await this.$router.replace("/u");
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        this.submitting = false;
        this.error = error;
      }
    }
  }
};
</script>
