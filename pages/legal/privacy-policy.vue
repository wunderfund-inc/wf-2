<template>
  <main>
    <legal-nav />
    <div class="container py-5 text-justify">
      <privacy-policy />
    </div>
  </main>
</template>

<script>
import LegalNav from "@/components/Legal/LegalNav";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";

export default {
  components: {
    LegalNav,
    PrivacyPolicy
  }
};
</script>
