<template lang="pug">
  section#manual-auth
    b-card.my-2(no-body)
      b-card-header(header-tag="header" class="p-1" role="tab")
        b-button(block size="lg" href="#" v-b-toggle.accordion-1 variant="success") Register via Magic Link
        b-collapse(id="accordion-1" accordion="my-accordion" role="tabpanel")
          b-card-body
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
                b-form-checkbox.py-2(switch v-model="agreements[0]") I understand there are risks in investing on a crowdfunding platform, outlined here.
                b-form-checkbox.py-2(switch v-model="agreements[1]") I am agreeing to Wunderfund's Terms of Service.
                b-form-checkbox.py-2(switch v-model="agreements[2]") I am agreeing to Wunderfund's Privacy Policy.
                b-form-checkbox.py-2(switch v-model="agreements[3]") I understand Wunderfund earns its income as described by...
              b-button(size="lg" variant="primary" block :disabled="!validMagicLinkForm" type="submit") Send Link
    b-card.my-2(no-body)
      b-card-header(header-tag="header" class="p-1" role="tab")
        b-button(block size="lg" href="#" v-b-toggle.accordion-2 variant="info" @click="setRegistrationType('password')") Register via a Password
        b-collapse#accordion-2(accordion="my-accordion" role="tabpanel")
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
                b-form-checkbox.py-2(switch v-model="agreements[0]") I understand there are risks in investing on a crowdfunding platform, outlined here.
                b-form-checkbox.py-2(switch v-model="agreements[1]") I am agreeing to Wunderfund's Terms of Service.
                b-form-checkbox.py-2(switch v-model="agreements[2]") I am agreeing to Wunderfund's Privacy Policy.
                b-form-checkbox.py-2(switch v-model="agreements[3]") I understand Wunderfund earns its income as described by...
              b-button(size="lg" variant="primary" block :disabled="!validRegistrationForm" type="submit") Register
</template>

<script>
export default {
  data() {
    return {
      registrationType: null,
      email: null,
      password: null,
      confirmPassword: null,
      agreements: [false, false, false, false]
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
    setRegistrationType(val) {
      if (val === "link") this.registrationType = "link";
      if (val === "password") this.registrationType = "password";
    },
    registerViaMagicLink() {
      this.$store.dispatch("auth/REGISTER_VIA_MAGIC_LINK", this.email);
    },
    async registerViaPassword() {
      const credentials = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("auth/REGISTER_VIA_PASSWORD", credentials);
    }
  }
};
</script>
