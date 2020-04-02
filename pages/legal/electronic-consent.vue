<template>
  <main>
    <legal-nav />
    <div class="container py-5 text-justify">
      <electronic-consent />
    </div>
  </main>
</template>

<script>
import LegalNav from "@/components/Legal/LegalNav";
import ElectronicConsent from "@/components/Legal/ElectronicConsent";

export default {
  components: {
    LegalNav,
    ElectronicConsent
  }
};
</script>
