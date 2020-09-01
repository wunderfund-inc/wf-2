<template>
  <section>
    <b-overlay :show="showOverlay">
      <template #overlay>
        <div class="d-flex justify-content-center mb-3">
          <b-spinner large variant="secondary" />
          <span class="sr-only">Please wait...</span>
        </div>
        <div class="text-center">
          <p>Logging In...</p>
        </div>
      </template>

      <b-alert :show="showEmailNeedsVerificationAlert" variant="info">
        <div class="p-3">
          <h4 class="alert-heading">Oops!</h4>
          <hr />
          <p>
            Your email address hasn't been verified. Please check the inbox of
            <strong>{{ form.email }}</strong> to verify your email before
            logging in.
          </p>
          <button @click="resendLink" v-if="!linkResent" class="btn btn-info">
            Resend Link
          </button>
          <p v-else>
            Link sent!
          </p>
        </div>
      </b-alert>

      <div class="card bg-light mb-3">
        <div class="container my-3">
          <form @submit.prevent="submitLoginForm">
            <div class="form-group">
              <label for="input-email">Email address</label>
              <input
                id="input-email"
                v-model.trim="form.email"
                type="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="input-password">Password</label>
              <input
                id="input-password"
                v-model.trim="form.password"
                type="password"
                class="form-control"
              />
            </div>
            <button class="btn btn-block btn-primary" type="submit">
              Login
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
import { auth, verifyEmail } from "@/plugins/firebase";

export default {
  data() {
    return {
      linkResent: false,
      showEmailNeedsVerificationAlert: false,
      form: {
        email: null,
        password: null
      },
      error: null
    };
  },
  computed: {
    ...mapGetters(["showOverlay"])
  },
  methods: {
    async resendLink() {
      try {
        const { email, password } = this.form;
        await auth.signInWithEmailAndPassword(email, password);
        await verifyEmail();
        await auth.signOut();
        this.linkResent = true;
      } catch (error) {
        this.error = error.message;
      }
    },
    async submitLoginForm() {
      try {
        await this.$store.dispatch("toggleOverlay", true);
        await this.$store.dispatch("auth/loginUser", this.form);
        await this.$store.dispatch("toggleOverlay", false);
        if (this.$route.query.return_to) {
          await this.$router.replace(
            decodeURIComponent(this.$route.query.return_to)
          );
        } else {
          await this.$router.go("/auth/attest");
        }
      } catch (error) {
        if (error.message === "Error: Email not verified") {
          this.showEmailNeedsVerificationAlert = true;
        } else {
          this.error = error.message;
        }
        await this.$store.dispatch("toggleOverlay", false);
      }
    }
  }
};
</script>
