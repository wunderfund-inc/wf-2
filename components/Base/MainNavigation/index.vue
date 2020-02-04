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
          //- b-nav-item(to="/c") Browse
          b-nav-item(
            to="/raise-capital"
            active-class="font-weight-bolder"
          ) Raise Capital
          b-nav-item(
            to="/faq"
            active-class="font-weight-bolder"
          ) FAQ
          div(v-if="loggedIn")
            b-nav-item.d-block.d-md-none(
              to="/u"
              active-class="font-weight-bolder"
            ) Account
            b-nav-item.d-block.d-md-none(to="/" @click="logout") Logout
          div(v-else)
            b-nav-item.d-block.d-md-none(
              to="/auth/login"
              active-class="font-weight-bolder"
            ) Login
            b-nav-item.d-block.d-md-none(
              to="/auth/register"
              active-class="font-weight-bolder"
            ) Sign Up
      b-navbar-nav.ml-auto.d-none.d-md-flex(v-if="loggedIn")
        //- b-nav-item-dropdown(right no-caret)
          template(slot="button-content")
            b-img(
              thumbnail
              src="https://avatars0.githubusercontent.com/u/4671881?s=460&v=4"
              rounded="circle"
              width="45"
              height="45"
            )
        b-nav-item(
          to="/u"
          active-class="font-weight-bolder"
        ) Account
        b-nav-item(to="/" @click="logout") Logout
      b-navbar-nav.ml-auto.d-none.d-md-flex(v-else)
        b-nav-item(
          to="/auth/login"
          active-class="font-weight-bolder"
        ) Login
        b-nav-item(
          to="/auth/register"
          active-class="font-weight-bolder"
        ) Sign Up
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loggedIn: "auth/currentUserAuth"
    })
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
        await this.$route.replace("/");
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }
  }
};
</script>
