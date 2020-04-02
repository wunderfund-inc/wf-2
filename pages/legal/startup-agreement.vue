<template>
  <main>
    <legal-nav />
    <div class="container py-5 text-justify">
      <startup-agreement />
    </div>
  </main>
</template>

<script>
import LegalNav from "@/components/Legal/LegalNav";
import StartupAgreement from "@/components/Legal/StartupAgreement";

export default {
  components: {
    LegalNav,
    StartupAgreement
  }
};
</script>
