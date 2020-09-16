<template>
  <section>
    <h4 class="pb-3">Password Reset</h4>
    <b-alert v-model="errorDisplay" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <form @submit.prevent="submitPasswordChange">
      <div class="form-row">
        <div class="col-12 col-md-6">
          <b-form-group
            :state="validateState('old')"
            class="text-left"
            label="Type your old password below"
            label-for="password-old"
          >
            <b-form-input
              id="password-old"
              v-model="$v.password.old.$model"
              :state="validateState('old')"
              type="password"
              trim
            />
          </b-form-group>
        </div>
        <div class="col-12 col-md-6">
          <b-form-group
            :state="validateState('new')"
            class="text-left"
            label="New Password"
            label-for="password-new"
          >
            <b-form-input
              id="password-new"
              v-model="$v.password.new.$model"
              :state="validateState('new')"
              type="password"
              trim
            />
            <b-form-invalid-feedback :state="validateState('new')">
              <ul v-if="$v.password.$anyError">
                <li v-if="!$v.password.new.minLength">
                  <span>Must be at least 8 characters</span>
                </li>
                <li v-if="!$v.password.new.differentFromOld">
                  <span>Cannot be the same as your old password.</span>
                </li>
              </ul>
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <button
            :class="`btn btn-${color} px-3`"
            :disabled="$v.password.$invalid || submitting"
            type="submit"
          >
            <span>Reset Password</span>
          </button>
        </div>
      </div>
    </form>
  </section>
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
  computed: {
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
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
          "auth/updatePassword",
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
