<template lang="pug">
  b-form(@submit.stop.prevent="handleRegistration")
    b-form-group(
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
    b-form-group(
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
    b-form-group(
      label="Confirm Password"
      label-for="input-password"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    )
      b-form-input#input-password(
        type="password"
        v-model="confirmPassword"
        :state="state"
        trim
      )
    b-form-group(label="Please also acknowledge the following:")
      b-form-checkbox.py-2(switch) I understand there are risks in investing on a crowdfunding platform, outlined here.
      b-form-checkbox.py-2(switch) I am agreeing to Wunderfund's Terms of Service.
      b-form-checkbox.py-2(switch) I am agreeing to Wunderfund's Privacy Policy.
      b-form-checkbox.py-2(switch) I understand Wunderfund earns its income as described by...
    button.mb-3.btn.btn-lg.btn-primary.btn-block Register
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      invalidFeedback: null,
      validFeedback: null,
      confirmPassword: null,
      state: null
    };
  }
};
</script>
