<template>
  <base-sub-nav :list="list" category="faq" />
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
          title: "General",
          slug: "general"
        },
        {
          title: "Investors",
          slug: "investor"
        },
        {
          title: "Companies",
          slug: "company"
        }
      ]
    };
  }
};
</script>
