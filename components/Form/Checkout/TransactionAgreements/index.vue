<template lang="pug">
  b-form-group(label="Finally, the following must be agreed upon:")
    b-form-checkbox.py-2(
      v-for="(agreement, index) in agreements"
      :key="index"
      :value="agreement"
      v-model="agreedTo"
      switch
    )
      span(:class="agreedTo.includes(agreement) ? 'text-muted' : ''") {{ agreement }}
</template>

<script>
export default {
  data() {
    return {
      agreements: [
        "I understand that startups and small businesses are very risky. I acknowledge a potential 100% loss on all investments into this particular company, using Wunderfund's technology.",
        "I understand securities created via Wunderfund's technology are not easily resold. There is no secondary market for these particular securities offered.",
        "I are savvy enough to understand the subject of crowdfunding. I have contacted the company (or posted in the comments!) with any questions I may have before starting this commitment process.",
        "I understand that this platform (and the team behind it) cannot offer investment advice. I must have the sophistication and education necessary to evaluate investments on my own.",
        "I acknowledge that the information regarding my identity and/or entity I represent is true to my knowledge."
      ]
    };
  },
  computed: {
    agreedTo: {
      get() {
        return this.$store.getters["checkout/agreedTo"];
      },
      async set(val) {
        await this.$store.dispatch("checkout/setAgreements", val);
      }
    }
  }
};
</script>
