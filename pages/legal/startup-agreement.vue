<template>
  <main>
    <div class="container py-5 text-justify">
      <h1 class="text-center mb-5">Startup Agreement</h1>
      <div class="row justify-content-center d-print-none">
        <div class="col-12 col-md-3 mb-3">
          <aside>
            <legal-nav />
          </aside>
        </div>
        <div class="col-12 col-md-9 mb-3">
          <article>
            <startup-agreement />
          </article>
        </div>
      </div>
      <startup-agreement class="d-none d-print-block" />
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
