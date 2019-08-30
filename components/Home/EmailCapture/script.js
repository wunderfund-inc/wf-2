export default {
  data() {
    return {
      email: null,
      show: true
    };
  },
  methods: {
    subscribeUser() {
      this.show = !this.show;
      // this.$store.dispatch('subscribeToNewsletter', this.email)
      this.email = null;
    }
  }
};
