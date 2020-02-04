<template lang="pug">
  b-form#via-password(@submit.stop.prevent="submitLogin")
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
    b-button(size="lg" variant="primary" block type="submit") Login
    p.text-danger.pt-3 {{ error }}
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      invalidFeedback: null,
      validFeedback: null,
      state: null,
      error: null
    };
  },
  methods: {
    async submitLogin() {
      try {
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
        this.error = error.message;
      }
    }
  }
};
</script>
