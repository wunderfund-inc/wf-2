<template>
  <b-alert show variant="info">
    <div class="container py-4">
      <h4 class="alert-heading">Please verify your email</h4>
      <p>
        You're almost ready to invest! Please check the inbox of
        <strong>{{ email }}</strong> to verify your email.
      </p>
      <button v-if="showLink" class="btn btn-info" @click="resendLink">
        Resend Link
      </button>
      <p v-else>Link sent!</p>
    </div>
  </b-alert>
</template>

<script>
import { verifyEmail } from "@/plugins/firebase";

export default {
  data() {
    return {
      showLink: true,
    };
  },
  computed: {
    email() {
      return this.$store.state.auth.email;
    },
  },
  methods: {
    resendLink() {
      verifyEmail();
      this.showLink = false;
    },
  },
};
</script>
