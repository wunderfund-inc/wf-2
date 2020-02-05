<template lang="pug">
  section
    hr
    .container
      h4.pb-3 Password Reset
      b-alert(
        v-model="errorDisplay"
        variant="danger"
        dismissible
      ) {{ errorMessage }}
      form(@submit.prevent="submitPasswordChange")
        .form-row
          .col-12.col-md-6
            b-form-group.text-left(
              label="Type your old password below:"
              label-for="password-old"
              :state="validateState('old')"
            )
              b-form-input#password-old(
                v-model="$v.password.old.$model"
                :state="validateState('old')"
                type="password"
                trim
              )
          .col-12.col-md-6
            b-form-group.text-left(
              label="New Password"
              label-for="password-new"
              :state="validateState('new')"
            )
              b-form-input#password-new(
                v-model="$v.password.new.$model"
                :state="validateState('new')"
                type="password"
              )
              b-form-invalid-feedback(:state="validateState('new')")
                ul(v-if="$v.password.$anyError")
                  li(v-if="!$v.password.new.minLength")
                    span Must be at least 8 characters.
                  li(v-if="!$v.password.new.differentFromOld")
                    span Cannot be the same as your old password.
        b-form-row
          b-col
            b-button(
              variant="success"
              type="submit"
              :disabled="$v.password.$invalid || submitting"
            )
              span.spinner-border.spinner-border-sm.mr-2(
                v-if="submitting"
                role="status"
                aria-hiden="true"
                style="margin-bottom: 4px"
              )
              span(v-if="submitting") Submitting...
              span(v-if="!submitting") Sign Up
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, not, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      errorDisplay: false,
      errorMessage: null,
      submitting: false,
      password: {
        old: null,
        new: null
      }
    };
  },
  validations: {
    password: {
      old: {
        required,
        minLength: minLength(8)
      },
      new: {
        required,
        minLength: minLength(8),
        differentFromOld: not(sameAs("old"))
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.password[name];
      return $dirty ? !$error : null;
    },
    async submitPasswordChange() {
      try {
        this.submitting = true;
        const error = await this.$store.dispatch(
          "auth/resetPassword",
          this.password.new
        );
        if (error) {
          this.errorDisplay = true;
          this.errorMessage = error;
          this.submitting = false;
          return;
        } else {
          this.errorDisplay = false;
          this.errorMessage = null;
          setTimeout(async () => {
            this.submitting = false;
            await this.$store.dispatch("auth/logout");
            await this.$router.replace("/auth/login");
          }, 3000);
        }
      } catch (error) {
        this.errorDisplay = true;
        this.errorMessage = error;
        this.submitting = false;
      }
    }
  }
};
</script>
