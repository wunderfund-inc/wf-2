<template>
  <main>
    <legal-nav />
    <div class="container py-5 text-justify">
      <investor-agreement />
    </div>
  </main>
</template>

<script>
import LegalNav from "@/components/Legal/LegalNav";
import InvestorAgreement from "@/components/Legal/InvestorAgreement";

export default {
  components: {
    LegalNav,
    InvestorAgreement
  }
};
</script>
