<template lang="pug">
  section
    hr
    b-container
      h4.pb-3 Password Reset
      b-form(@submit.stop.prevent="changePassword")
        b-form-row
          b-col(md="6")
            b-form-group.text-left(
              label="Type your old password below:"
              label-for="password-old"
            )
              b-form-input#password-old(
                type="password"
                v-model="passwordOld"
                trim
              )
          b-col(md="6")
            b-form-group.text-left(
              label="New Password"
              label-for="password-new"
              :state="state"
              invalid-feedback="Cannot be the same as your old password."
            )
              b-form-input#password-new(
                type="password"
                v-model="passwordNew"
                trim
              )
        b-form-row
          b-col
            b-button(
              variant="success"
              type="submit"
              :disabled="!state"
            ) Save Changes
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.getters["user/validPasswordChange"];
    },
    passwordOld: {
      get() {
        return this.$store.getters["user/password"].old;
      },
      set(val) {
        this.$store.dispatch("user/setPasswordAttribute", { old: val });
      }
    },
    passwordNew: {
      get() {
        return this.$store.getters["user/password"].new;
      },
      set(val) {
        this.$store.dispatch("user/setPasswordAttribute", { new: val });
      }
    }
  },
  methods: {
    changePassword() {
      // eslint-disable-next-line
      console.log(`Password changed from "${this.passwordOld}" to "${this.passwordNew}"`);
    }
  }
};
</script>
