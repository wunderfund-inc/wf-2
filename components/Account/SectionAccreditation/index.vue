<template lang="pug">
  section
    hr
    b-container
      div(v-if="!isAccredited")
        h4.pb-3 Are you an Accredited Investor?
        p Based on the
          |
          |
          b-link(href="https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/updated-investor-bulletin-accredited-investors" target="_blank") SEC standards
          | , if you want to invest more than $2,200 annually on our platform, you're required to let us know that you qualify. Click the button below, and we'll verify you via email.
        b-button(variant="success" @click="applyForAccreditation") Verify Me!
      div(v-else)
        small.text-muted Need to change your Annual Income or Net Worth so you can invest more annually?
            |
            |
            b-link(href="https://www.google.com") Re-verify!
</template>

<script>
export default {
  computed: {
    isAccredited() {
      return this.$store.getters["user/currentUser"].accredited;
    }
  },
  methods: {
    applyForAccreditation() {
      // TODO: Change once we have e-verification set up
      // eslint-disable-next-line
      console.log("API call to send email");
    }
  }
};
</script>
