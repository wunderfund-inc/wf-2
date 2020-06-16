<template>
  <footer class="footer pt-5 d-print-none">
    <div class="container text-light">
      <div class="row">
        <div class="col-12 col-md-3 text-center text-md-left pb-5">
          <div class="row d-flex justify-content-center mb-3">
            <nuxt-link to="/">
              <b-img :src="require(`@/assets/logo/logo.png`)" width="200px" />
            </nuxt-link>
          </div>

          <div class="row d-flex justify-content-center">
            <p>Startup Investing at its finest.</p>
          </div>

          <div class="row d-flex justify-content-around">
            <b-link class="pr-2 text-light" href="mailto:taylor@wunderfund.co">
              <solid-icon class="fa-2x" i="envelope-square" />
            </b-link>
            <b-link
              class="px-2 text-light"
              href="https://www.facebook.com/thewunderfund"
            >
              <brand-icon class="fa-2x" i="facebook-square" />
            </b-link>
            <b-link
              class="px-2 text-light"
              href="https://www.linkedin.com/company/wunderfund"
            >
              <brand-icon class="fa-2x" i="linkedin" />
            </b-link>
            <b-link
              class="px-2 text-light"
              href="https://twitter.com/thewunderfund"
            >
              <brand-icon class="fa-2x" i="twitter-square" />
            </b-link>
            <b-link
              class="px-2 text-light"
              href="https://www.youtube.com/channel/UC6O_9SMFr8BHa5XwfV3xykQ"
            >
              <brand-icon class="fa-2x" i="youtube-square" />
            </b-link>
          </div>
        </div>
        <div class="col-12 col-md-9 pb-5">
          <p>
            <nuxt-link to="/" class="text-light font-weight-bold"
              >Wunderfund.co</nuxt-link
            >
            is run by Wunderfund, Inc. By using
            <nuxt-link to="/" class="text-light font-weight-bold"
              >Wunderfund.co</nuxt-link
            >, you accept our
            <nuxt-link
              to="/legal/terms-of-use"
              class="text-light font-weight-bold"
              >Terms of Use</nuxt-link
            >
            and
            <nuxt-link
              to="/legal/privacy-policy"
              class="text-light font-weight-bold"
              >Privacy Policy</nuxt-link
            >. By choosing to invest using
            <nuxt-link to="/" class="text-light font-weight-bold"
              >Wunderfund.co</nuxt-link
            >, you accept our
            <nuxt-link
              to="/legal/investor-agreement"
              class="text-light font-weight-bold"
              >Investor Agreement</nuxt-link
            >. By choosing to post your offering using
            <nuxt-link to="/" class="text-light font-weight-bold"
              >Wunderfund.co</nuxt-link
            >'s technologies, you accept our
            <nuxt-link
              to="/legal/startup-agreement"
              class="text-light font-weight-bold"
              >Startup Agreement</nuxt-link
            >.
            <nuxt-link to="/" class="text-light font-weight-bold"
              >Wunderfund.co</nuxt-link
            >, along with
            <b-link
              href="https://www.northcapital.com"
              target="_blank"
              class="text-light font-weight-bold"
              >North Capital Private Securities</b-link
            >
            and
            <b-link
              href="https://www.transferonline.com"
              target="_blank"
              class="text-light font-weight-bold"
              >Transfer Online</b-link
            >
            as partners, are all registered with the SEC and are members of
            FINRA.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SolidIcon from "@/components/Common/SolidIcon";
import BrandIcon from "@/components/Common/BrandIcon";

export default {
  components: {
    SolidIcon,
    BrandIcon
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: lighten(#003b5a, 1%);
}
</style>
