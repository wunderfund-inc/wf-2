<template>
  <base-sub-nav :list="list" category="legal" />
</template>

<script>
import BaseSubNav from "@/components/Base/BaseSubNav";

export default {
  components: {
    BaseSubNav
  },
  data() {
    return {
      list: [
        {
          title: "Terms of Service",
          slug: "terms-of-service"
        },
        {
          title: "Privacy Policy",
          slug: "privacy-policy"
        },
        {
          title: "Investor Agreement",
          slug: "investor-agreement"
        },
        {
          title: "Startup Agreement",
          slug: "startup-agreement"
        },
        {
          title: "Electronic Consent",
          slug: "electronic-consent"
        }
      ]
    };
  }
};
</script>
