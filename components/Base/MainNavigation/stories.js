import { storiesOf } from "@storybook/vue";

import MainNavigation from "./index.vue";

storiesOf("Layout", module).add("Main Navbar", () => ({
  components: { MainNavigation },
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
  },
  template: `<main-navigation />`
}));
