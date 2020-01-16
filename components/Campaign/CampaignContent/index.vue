<template lang="pug">
  h1 {{ company.name.short }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ company: "company/company" })
  }
};
</script>
