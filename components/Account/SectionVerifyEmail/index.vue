<template lang="pug">
  b-row
    b-col.d-none.d-md-block
    b-col
      b-card
        b-card-body
          h1 Next Steps
          p It looks like you haven't been verified yet. Please check your inbox (or spam folder!) of #[span.text-success {{ email }}] for a link to verify you.
          small #[b-btn(@click="linkToVerify") Click here to resend the link.]
    b-col.d-none.d-md-block
</template>

<script>
import { mapGetters } from "vuex";
import { verifyEmail } from "@/plugins/firebase";

export default {
  computed: {
    ...mapGetters({
      email: "auth/email"
    })
  },
  methods: {
    linkToVerify() {
      verifyEmail();
    }
  }
};
</script>
