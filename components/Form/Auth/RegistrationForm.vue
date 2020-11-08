<template>
  <section>
    <b-overlay :show="showOverlay">
      <template #overlay>
        <div class="d-flex justify-content-center mb-3">
          <b-spinner large variant="secondary" />
          <span class="sr-only">Please wait...</span>
        </div>
        <span class="text-center">
          <p>Creating User...</p>
        </span>
      </template>

      <b-alert :show="showAlert" variant="info">
        <div class="p-3">
          <h4 class="alert-heading">Please verify your email</h4>
          <hr />
          <p class="mb-0">
            Please check the inbox of <strong>{{ form.email }}</strong> to
            verify your email.
          </p>
        </div>
      </b-alert>

      <div class="card bg-light mb-3">
        <div class="container my-3">
          <form @submit.prevent="submitRegistrationForm">
            <b-form-group
              :state="validateState('email')"
              label="Email Address"
              label-for="input-email-2"
              invalid-feedback="Not an email address."
            >
              <b-form-input
                id="input-email-2"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                type="email"
                trim
              />
            </b-form-group>

            <b-form-group
              :state="validateState('password')"
              label="Enter a password"
              label-for="input-password"
              invalid-feedback="Must be at least 8 characters long."
            >
              <b-form-input#input-password(
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                type="password"
                trim
              />
            </b-form-group>

            <b-form-group
              :state="validateState('confirmPassword')"
              label="Confirm your password"
              label-for="confirm-password"
              invalid-feedback="Passwords don't match"
            >
              <b-form-input
                id="confirm-password"
                v-model="$v.form.confirmPassword.$model"
                :state="validateState('confirmPassword')"
                type="password"
                trim
              />
            </b-form-group>
            <button
              :disabled="$v.validRegistration.$invalid"
              class="btn btn-block btn-primary"
              type="submit"
            >
              Sign Up
            </button>
            <p class="text-danger mb-0">{{ error }}</p>
          </form>
        </div>
      </div>
    </b-overlay>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

import { auth } from "@/plugins/firebase";

export default {
  mixins: [validationMixin],
  data() {
    return {
      showAlert: false,
      error: null,
      form: {
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        matchPassword: sameAs("password"),
      },
    },
    validRegistration: ["form.email", "form.password", "form.confirmPassword"],
  },
  computed: {
    ...mapGetters(["showOverlay"]),
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async submitRegistrationForm() {
      try {
        this.error = null;
        await this.$store.dispatch("toggleOverlay", true);
        const { email, password } = this.form;
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await user.sendEmailVerification({
          url: this.$config.BASE_URL,
          handleCodeInApp: true,
        });
        await auth.signOut();
        await this.$store.dispatch("toggleOverlay", false);
        this.showAlert = true;
      } catch (error) {
        await this.$store.dispatch("toggleOverlay", false);
        this.error = error.message;
      }
    },
  },
};
</script>
