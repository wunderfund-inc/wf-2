<template>
  <footer class="footer pt-5 d-print-none">
    <div class="container text-light">
      <div class="row">
        <div class="col-12 col-md-3 text-center text-md-left pb-5">
          <div class="row d-flex justify-content-center mb-3">
            <PlatformLogo />
          </div>

          <div class="row d-flex justify-content-center">
            <p>Startup Investing at its finest.</p>
          </div>

          <div class="row d-flex justify-content-around">
            <a href="mailto:taylor@wunderfund.co" class="pr-2 text-light">
              <solid-icon class="fa-2x" i="envelope-square" />
            </a>
            <a
              href="https://www.facebook.com/thewunderfund"
              class="px-2 text-light"
            >
              <brand-icon class="fa-2x" i="facebook-square" />
            </a>
            <a
              href="https://www.linkedin.com/company/wunderfund"
              class="px-2 text-light"
            >
              <brand-icon class="fa-2x" i="linkedin" />
            </a>
            <a href="https://twitter.com/thewunderfund" class="px-2 text-light">
              <brand-icon class="fa-2x" i="twitter-square" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC6O_9SMFr8BHa5XwfV3xykQ"
              class="px-2 text-light"
            >
              <brand-icon class="fa-2x" i="youtube-square" />
            </a>
          </div>
        </div>
        <div class="col-12 col-md-9 pb-5">
          <p>
            <PlatformLink class="text-light font-weight-bold" />
            is run by Wunderfund, Inc. By using
            <PlatformLink class="text-light font-weight-bold" />
            you accept our
            <nuxt-link
              to="/legal/terms-of-use"
              class="text-light font-weight-bold"
            >
              Terms of Use
            </nuxt-link>
            and
            <nuxt-link
              to="/legal/privacy-policy"
              class="text-light font-weight-bold"
            >
              Privacy Policy.
            </nuxt-link>
            By choosing to invest using
            <PlatformLink class="text-light font-weight-bold" />
            you accept our
            <nuxt-link
              to="/legal/investor-agreement"
              class="text-light font-weight-bold"
            >
              Investor Agreement.
            </nuxt-link>
            By choosing to post your offering using
            <PlatformLink class="text-light font-weight-bold" />
            technologies, you accept our
            <nuxt-link
              to="/legal/startup-agreement"
              class="text-light font-weight-bold"
            >
              Startup Agreement.
            </nuxt-link>
            <PlatformLink class="text-light font-weight-bold" />
            is registered with the SEC and is a member of FINRA.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import PlatformLink from "@/components/Platform/Link";
import PlatformLogo from "@/components/Platform/Logo";
import SolidIcon from "@/components/Common/SolidIcon";
import BrandIcon from "@/components/Common/BrandIcon";

export default {
  components: {
    PlatformLink,
    PlatformLogo,
    SolidIcon,
    BrandIcon
  },
  computed: {
    platform() {
      return process.env.PLATFORM;
    },
    platformImgSrc() {
      if (this.platform) {
        return require(`@/assets/platform/${this.platform.toLowerCase()}/logo.png`);
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: lighten(#003b5a, 1%);
}
</style>
