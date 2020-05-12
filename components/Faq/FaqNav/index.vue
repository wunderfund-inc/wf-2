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
          name: "General",
          url: "/faq/general"
        },
        {
          name: "Investors",
          url: "/faq/investors"
        },
        {
          name: "Companies",
          url: "/faq/companies"
        }
      ]
    };
  }
};
</script>
