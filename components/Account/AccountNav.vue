<template>
  <base-sub-nav :links="links" />
</template>

<script>
import BaseSubNav from "@/components/Base/BaseSubNav.vue";

export default {
  components: {
    BaseSubNav,
  },
  data() {
    return {
      links: [
        { name: "Profile", url: "/u/" },
        { name: "Accreditation", url: "/u/accreditation" },
        { name: "Investments", url: "/u/investments" },
        { name: "Settings", url: "/u/settings" },
      ],
    };
  },
};
</script>
