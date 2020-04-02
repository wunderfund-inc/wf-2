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
          p Creating user...
      b-card.my-2(no-body)
        b-card-body
          b-form#via-password(
            @submit.prevent="submitRegistrationForm"
            @keypress.enter.prevent="submitRegistrationForm"
          )
            .form-row
              .col-12.col-md-6
                b-form-group(
                  label="First Name"
                  label-for="input-name-first"
                )
                  b-form-input#input-name-first(
                    v-model="form.name.first"
                    type="text"
                    trim
                  )
              .col-12.col-md-6
                b-form-group(
                  label="Last Name"
                  label-for="input-name-last"
                )
                  b-form-input#input-name-last(
                    v-model="form.name.last"
                    type="text"
                    trim
                  )
            b-form-group(
              label="Email Address"
              label-for="input-email-2"
              :state="validateState('email')"
              invalid-feedback="Not an email address."
            )
              b-form-input#input-email-2(
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                type="email"
                trim
              )
            b-form-group(
              label="Enter a password"
              label-for="input-password"
              :state="validateState('password')"
              invalid-feedback="Must be at least 8 characters long."
            )
              b-form-input#input-password(
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                type="password"
                trim
              )
            b-form-group(
              label="Confirm your password"
              label-for="confirm-password"
              :state="validateState('confirmPassword')"
              invalid-feedback="Passwords don't match"
            )
              b-form-input#confirm-password(
                v-model="$v.form.confirmPassword.$model"
                :state="validateState('confirmPassword')"
                type="password"
                trim
              )
            b-form-group(label="Also, you must acknowledge the following:")

              b-form-checkbox.py-2(
                v-model="$v.form.attestations.$model[0]"
                value="The user acknowledges there are inherent risks investing in a startup."
                switch
              ) I understand there are risks in investing on a crowdfunding platform, outlined #[nuxt-link(to="/legal/investor-agreement" target="_blank") here].

              b-form-checkbox.py-2(
                v-model="$v.form.attestations.$model[1]"
                value="The user acknowledges Wunderfund's Terms of Use."
                switch
              ) I'm agreeing to Wunderfund's #[nuxt-link(to="/legal/terms-of-use" target="_blank") Terms of Use].

              b-form-checkbox.py-2(
                v-model="$v.form.attestations.$model[2]"
                value="The user acknowledges Wunderfund's Privacy Policy."
                switch
              ) I'm agreeing to Wunderfund's #[nuxt-link(to="/legal/privacy-policy" target="_blank") Privacy Policy].

              b-form-checkbox.py-2(
                v-model="$v.form.attestations.$model[3]"
                value="The user acknowledges Wunderfund's disclosure for the platform generating income."
                switch
              ) I understand that Wunderfund has a way to #[nuxt-link(to="/faq/company" target="_blank") earn income] with every campaign offered on this platform.

            b-button(
              variant="primary"
              block
              :disabled="$v.validRegistration.$invalid"
              type="submit"
            )
              span.spinner-border.spinner-border-sm.mr-2(
                v-if="submitting"
                role="status"
                aria-hiden="true"
                style="margin-bottom: 4px"
              )
              span(v-if="submitting") Registering...
              span(v-if="!submitting") Sign Up
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: {
          first: null,
          last: null
        },
        email: null,
        password: null,
        confirmPassword: null,
        attestations: []
      },
      attestationsList: [
        "I understand there are risks in investing on a crowdfunding platform, outlined here.",
        "I am agreeing to Wunderfund's Terms of Use.",
        "I am agreeing to Wunderfund's Privacy Policy.",
        "I understand Wunderfund earns its income as described by..."
      ]
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        matchPassword: sameAs("password")
      },
      attestations: {
        required,
        minLength: minLength(4)
      }
    },
    validRegistration: [
      "form.email",
      "form.password",
      "form.confirmPassword",
      "form.attestations"
    ]
  },
  computed: {
    ...mapGetters(["showOverlay"])
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async submitRegistrationForm() {
      try {
        await this.$store.dispatch("toggleOverlay", true);
        await this.$store.dispatch("auth/createUser", this.form);
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
