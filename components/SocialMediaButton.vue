<template>
  <button
    :style="`background-color: ${color}; border: 1px solid ${color}`"
    class="btn btn-block btn-lg"
    @click="signIn"
  >
    <span class="d-inline text-light">
      Sign in with {{ name | properCase }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch("auth/signInWithSocialMedia", this.name);
        if (this.$route.query.return_to) {
          await this.$router.replace(
            decodeURIComponent(this.$route.query.return_to)
          );
        } else {
          await this.$router.go("/auth/attest");
        }
      } catch (error) {
        await this.$store.dispatch("displaySocialMediaError", error.message);
      }
    },
  },
};
</script>
