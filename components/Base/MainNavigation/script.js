export default {
  computed: {
    signedIn() {
      return this.$store.getters["user/userData"];
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/LOGOUT_USER");
    }
  }
};
