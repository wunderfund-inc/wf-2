<template>
  <main>
    <legal-nav />
    <div class="container py-5 text-justify">
      <terms-of-service />
    </div>
  </main>
</template>

<script>
import LegalNav from "@/components/Legal/LegalNav";
import TermsOfService from "@/components/Legal/TermsOfService";

export default {
  components: {
    LegalNav,
    TermsOfService
  }
};
</script>
