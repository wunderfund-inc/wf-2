<template lang="pug">
  main
    b-container.py-5
      b-row
        b-col.d-none.d-md-block(md="3")
          account-sidebar
        b-col(md="9")
          h1 Insert PII form
</template>

<script>
import AccountSidebar from "@/components/Account/AccountSidebar";

export default {
  components: {
    AccountSidebar
  }
};
</script>
