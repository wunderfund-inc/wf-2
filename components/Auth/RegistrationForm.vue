<template lang="pug">
  b-form
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
    b-form-group.text-left(
      label="Confirm Password"
      label-for="input-password"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    )
      b-form-input#input-password(
        type="password"
        v-model="confirm_password"
        :state="state"
        trim
      )
    button.btn.btn-lg.btn-primary.btn-block Register
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      invalidFeedback: null,
      validFeedback: null,
      confirm_password: null,
      state: null
    };
  }
};
</script>
