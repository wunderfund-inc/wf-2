<template lang="pug">
  b-row
    b-col.d-none.d-md-block
    b-col
      b-card
        b-card-body
          h1 Next Steps
          p It looks like your email hasn't been verified yet. Please check the inbox of #[span.text-success {{ email }}] for the link to verify.
          small #[b-btn(@click="linkToVerify") Click here to resend the link.]
    b-col.d-none.d-md-block
</template>

<script>
import { mapGetters } from "vuex";
import { verifyEmail } from "@/plugins/firebase";

export default {
  computed: {
    ...mapGetters({
      user: "auth/currentUserAuth"
    }),
    email: () => this.user.email
  },
  methods: {
    linkToVerify() {
      verifyEmail();
    }
  }
};
</script>
