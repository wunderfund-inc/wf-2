<template>
  <base-sub-nav :links="links" />
</template>

<script>
import BaseSubNav from "@/components/Base/BaseSubNav";

export default {
  components: {
    BaseSubNav
  },
  data() {
    return {
      links: [
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
      ]
    };
  }
};
</script>
