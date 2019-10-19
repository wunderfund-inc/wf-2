export default {
  data() {
    return {
      loggedIn: true
    };
  },
  computed: {
    signedIn() {
      return this.loggedIn;
    }
  },
  methods: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    }
  }
};
