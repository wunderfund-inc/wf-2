<template>
  <header>
    <b-navbar toggleable="md" type="light" variant="transparent">
      <b-container class="py-3">
        <b-navbar-brand>
          <PlatformLogo />
        </b-navbar-brand>
        <b-navbar-toggle target="collapse"></b-navbar-toggle>
        <b-collapse id="collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/raise-capital" class="mx-md-3">
              Raise Capital
            </b-nav-item>

            <b-nav-item-dropdown text="FAQs" class="mx-3 d-none d-md-flex">
              <b-dropdown-item to="/faq/general">General</b-dropdown-item>
              <b-dropdown-item to="/faq/companies">
                On Fundraising
              </b-dropdown-item>
              <b-dropdown-item to="/faq/investors">
                For Investors
              </b-dropdown-item>
              <b-dropdown-item to="/faq/securities">
                On Securities
              </b-dropdown-item>
              <b-dropdown-item to="/faq/reporting">
                On Reporting
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Legal" class="mx-3 d-none d-md-flex">
              <b-dropdown-item to="/legal/terms-of-use">
                Terms of Use
              </b-dropdown-item>
              <b-dropdown-item to="/legal/privacy-policy">
                Privacy Policy
              </b-dropdown-item>
              <b-dropdown-item to="/legal/startup-agreement">
                Startup Agreement
              </b-dropdown-item>
              <b-dropdown-item to="/legal/investor-agreement">
                Investor Agreement
              </b-dropdown-item>
              <b-dropdown-item to="/legal/electronic-consent">
                Electronic Consent
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <div v-if="loggedIn" class="d-block d-md-none">
              <b-nav-item
                to="/account"
                active-class="font-weight-bolder"
                class="px-md-3"
              >
                Account
              </b-nav-item>
              <b-nav-item to="/" class="px-md-3" @click="logout">
                Logout
              </b-nav-item>
            </div>
            <div v-else class="d-block d-md-none">
              <b-nav-item
                to="/auth/login"
                active-class="font-weight-bolder"
                class="px-3"
              >
                Login
              </b-nav-item>
              <b-nav-item
                to="/auth/register"
                active-class="font-weight-bolder"
                class="px-3"
              >
                Register
              </b-nav-item>
            </div>
          </b-navbar-nav>
          <b-navbar-nav v-if="loggedIn" class="ml-auto d-none d-md-flex">
            <b-nav-item-dropdown
              :text="`Account (${email})`"
              class="font-weight-bolder"
            >
              <b-dropdown-item to="/account">Dashboard</b-dropdown-item>
              <b-dropdown-item to="/account/accreditation">
                Accreditation
              </b-dropdown-item>
              <b-dropdown-item to="/account/investments">
                Investments
              </b-dropdown-item>
              <b-dropdown-item to="/account/settings">
                Settings
              </b-dropdown-item>
              <b-dropdown-item to="/" @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto d-none d-md-flex">
            <b-nav-item
              to="/auth/login"
              active-class="font-weight-bolder"
              class="px-md-3"
            >
              Login
            </b-nav-item>
            <b-nav-item
              to="/auth/register"
              active-class="font-weight-bolder"
              class="px-md-3"
            >
              Register
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import PlatformLogo from "@/components/PlatformLogo";

export default {
  components: {
    PlatformLogo,
  },
  computed: {
    email() {
      return this.$store.state.auth.email;
    },
    loggedIn() {
      return !!this.$store.state.auth.email;
    },
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
    },
  },
};
</script>
