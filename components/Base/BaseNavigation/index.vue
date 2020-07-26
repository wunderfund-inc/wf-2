<template lang="pug">
header
  b-navbar(toggleable="md" type="light" variant="transparent")
    b-container.py-3
      b-navbar-brand(href="/")
        img.d-inline-block.align-top(
          :src="require(`@/assets/logo/logo.png`)"
          width="200"
          style="margin-bottom: 6px"
        )
      b-navbar-toggle(target="collapse")
      b-collapse#collapse(is-nav)
        b-navbar-nav
          b-nav-item.px-md-3(
            to="/browse"
            active-class="font-weight-bolder"
          ) Browse
          b-nav-item.px-md-3(
            to="/raise-capital"
            active-class="font-weight-bolder"
          ) Raise Capital
          b-nav-item.px-md-3(
            to="/faq/general"
            active-class="font-weight-bolder"
          ) FAQs
          b-nav-item.px-md-3(
            to="/legal/terms-of-use"
            active-class="font-weight-bolder"
          ) Legal
          div(v-if="loggedIn")
            b-nav-item.px-md-3.d-block.d-md-none(
              to="/account"
              active-class="font-weight-bolder"
            ) Account
            b-nav-item.d-block.d-md-none(to="/" @click="logout") Logout
          div(v-else)
            b-nav-item.px-md-3.d-block.d-md-none(
              to="/auth/login"
              active-class="font-weight-bolder"
            ) Login
            b-nav-item.px-md-3.d-block.d-md-none(
              to="/auth/register"
              active-class="font-weight-bolder"
            ) Sign Up
      b-navbar-nav.ml-auto.d-none.d-md-flex(v-if="loggedIn")
        b-nav-item.px-md-3(
          to="/account"
          active-class="font-weight-bolder"
        ) Account
        b-nav-item(to="/" @click="logout") Logout
      b-navbar-nav.ml-auto.d-none.d-md-flex(v-else)
        b-nav-item.px-md-3(
          to="/auth/login"
          active-class="font-weight-bolder"
        ) Login
        b-nav-item.px-md-3(
          to="/auth/register"
          active-class="font-weight-bolder"
        ) Sign Up
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return !!this.$store.state.auth.email;
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
        // await this.$router.replace("/");
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }
  }
};
</script>
