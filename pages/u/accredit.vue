<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col.d-none.d-md-block(md="3")
          account-sidebar
        b-col(md="9")
          section-accreditation
</template>

<script>
import AccountSidebar from "@/components/Account/AccountSidebar";
import SectionAccreditation from "@/components/Account/SectionAccreditation";

export default {
  components: {
    AccountSidebar,
    SectionAccreditation
  }
};
</script>
