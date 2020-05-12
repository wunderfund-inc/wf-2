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

export default {
  data() {
    return {
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
        await this.$store.dispatch("toggleOverlay", false);
        this.error = error.message;
      }
    }
  }
};
</script>
