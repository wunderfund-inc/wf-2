<template>
  <main class="d-flex align-items-center" style="min-height: 70vh;">
    <div class="container py-5 text-center">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <h1 class="pb-4">Reset your password</h1>
          <div class="card bg-light">
            <div class="container py-4">
              <form @submit.prevent="sendPasswordResetEmail" class="mb-3">
                <div class="form-group">
                  <label for="input-email">Email Address</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    required
                  />
                </div>
                <button
                  :disabled="submitted"
                  class="btn btn-block btn-primary"
                  type="submit"
                >
                  <span v-if="!submitted">Send</span>
                  <span v-else>Sent!</span>
                </button>
              </form>
              <span v-if="submitted" class="text-success">
                An email was sent to your inbox.
              </span>
              <span v-if="error" class="text-danger">
                {{ error }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      submitted: false,
      error: null
    };
  },
  methods: {
    async sendPasswordResetEmail() {
      try {
        this.submitted = true;
        await this.$store.dispatch("auth/sendPasswordResetEmail", this.email);
        // eslint-disable-next-line
        console.log(`Password reset sent to <${this.email}>`);
      } catch (error) {
        this.submitted = false;
        this.error = error;
      }
    }
  }
};
</script>
