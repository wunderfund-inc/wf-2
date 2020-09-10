<template>
  <div id="app">
    <base-navigation />
    <main>
      <div class="container py-5 text-justify">
        <h1 class="text-center mb-5">{{ pageTitle }}</h1>
        <div class="row justify-content-center">
          <div class="col-12 col-md-3 mb-3 d-print-none">
            <aside>
              <base-sub-nav :links="links" />
            </aside>
          </div>
          <div class="col-12 col-md-9 mb-3 d-print-block">
            <Nuxt />
          </div>
        </div>
      </div>
    </main>
    <base-footer />
  </div>
</template>

<script>
import BaseNavigation from "@/components/Base/BaseNavigation/index";
import BaseFooter from "@/components/Base/BaseFooter/index";
import BaseSubNav from "@/components/Base/BaseSubNav";

const legalLinks = [
  {
    name: "Terms of Use",
    url: "/legal/terms-of-use"
  },
  {
    name: "Privacy Policy",
    url: "/legal/privacy-policy"
  },
  {
    name: "Investor Agreement",
    url: "/legal/investor-agreement"
  },
  {
    name: "Startup Agreement",
    url: "/legal/startup-agreement"
  },
  {
    name: "Electronic Consent",
    url: "/legal/electronic-consent"
  }
];

const faqLinks = [
  {
    name: "General FAQs",
    url: "/faq/general"
  },
  {
    name: "FAQs for Investors",
    url: "/faq/investors"
  },
  {
    name: "FAQs for Companies",
    url: "/faq/companies"
  }
];

export default {
  components: {
    BaseNavigation,
    BaseFooter,
    BaseSubNav
  },
  data() {
    return {
      links: null,
      pageTitle: null
    };
  },
  created() {
    if (faqLinks.map(el => el.url).includes(this.$route.path)) {
      this.links = faqLinks;
    } else {
      this.links = legalLinks;
    }

    this.pageTitle = (
      faqLinks.find(el => el.url === this.$route.path) ||
      legalLinks.find(el => el.url === this.$route.path)
    ).name;
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
