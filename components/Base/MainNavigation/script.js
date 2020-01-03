export default {
  computed: {
    loggedIn() {
      return this.$store.getters["auth/currentUserAuth"];
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    }
  }
};
