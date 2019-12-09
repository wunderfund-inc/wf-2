<template lang="pug">
  section#manual-auth
    b-card.my-2(no-body)
      b-card-header(header-tag="header" class="p-1" role="tab")
        b-button(
          block
          size="lg"
          v-b-toggle.accordion-1
          variant="success"
        ) Register via Magic Link
        b-collapse#accordion-1(accordion="registration" role="tabpanel")
          b-card-body(v-if="formState")
            b-form#magic-link(@submit.stop.prevent="registerViaMagicLink")
              b-form-group(
                label="Email Address"
                label-for="input-email-1"
                description="Get a secure link to your email that will sign you in instantly."
              )
                b-form-input#input-email-1(
                  type="email"
                  v-model="email"
                  trim
                )
              b-form-group(label="Also, please acknowledge the following:")
                b-form-checkbox.py-2(
                  switch
                  v-for="(attestation, index) in attestations"
                  :key="index"
                  v-model="agreements[index]"
                ) {{ attestation }}
              b-button(size="lg" variant="primary" block :disabled="!validMagicLinkForm" type="submit") Send Link
          b-card-body(v-else)
            b-card-text Check your email. We sent you a link!
    b-card.my-2(no-body)
      b-card-header(header-tag="header" class="p-1" role="tab")
        b-button(
          block
          size="lg"
          v-b-toggle.accordion-2
          variant="info"
        ) Register via a Password
        b-collapse#accordion-2(accordion="registration" role="tabpanel")
          b-card-body
            b-form#via-password(@submit.stop.prevent="registerViaPassword")
              b-form-group(
                label="Email Address"
                label-for="input-email-2"
              )
                b-form-input#input-email-2(
                  type="email"
                  v-model="email"
                  trim
                )
              b-form-group(
                label="Enter a password"
                label-for="input-password"
              )
                b-form-input#input-password(
                  type="password"
                  v-model="password"
                  trim
                )
              b-form-group(
                label="Confirm your password"
                label-for="confirm-password"
                :state="matchingPasswords"
                invalid-feedback="Passwords don't match"
              )
                b-form-input#confirm-password(
                  type="password"
                  v-model="confirmPassword"
                  trim
                  :state="matchingPasswords"
                )
              b-form-group(label="Also, please acknowledge the following:")
                b-form-checkbox.py-2(
                  switch
                  v-for="(attestation, index) in attestations"
                  :key="index"
                  v-model="agreements[index]"
                ) {{ attestation }}
              b-button(size="lg" variant="primary" block :disabled="!validRegistrationForm" type="submit") Register
</template>

<script>
export default {
  data() {
    return {
      formState: true,
      email: null,
      password: null,
      confirmPassword: null,
      agreements: [false, false, false, false],
      attestations: [
        "I understand there are risks in investing on a crowdfunding platform, outlined here.",
        "I am agreeing to Wunderfund's Terms of Service.",
        "I am agreeing to Wunderfund's Privacy Policy.",
        "I understand Wunderfund earns its income as described by..."
      ]
    };
  },
  computed: {
    validEmail() {
      const reg = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(this.email);
    },
    validAttestations() {
      return this.agreements.every(x => x);
    },
    validMagicLinkForm() {
      return this.validEmail && this.validAttestations;
    },
    validRegistrationForm() {
      return (
        this.validEmail && this.validAttestations && this.matchingPasswords
      );
    },
    matchingPasswords() {
      if (this.password !== null && this.confirmPassword !== null) {
        return this.password === this.confirmPassword;
      }
      return null;
    }
  },
  methods: {
    async registerViaMagicLink() {
      await this.$store.dispatch("auth/registerViaMagicLink", this.email);
      this.formState = false;
    },
    async registerViaPassword() {
      const credentials = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("auth/registerViaPassword", credentials);
    }
  }
};
</script>
