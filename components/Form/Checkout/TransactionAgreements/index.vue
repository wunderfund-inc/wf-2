<template lang="pug">
  b-form-group(label="Finally, the following must be agreed upon:")
    b-form-checkbox.py-2(
      v-for="(agreement, index) in agreements"
      :key="index"
      :value="agreement.value"
      v-model="agreementList[index]"
      switch
      @input="setValidity"
    )
      span(:class="agreementList[index] ? 'text-muted' : ''") {{ agreement.text }}
</template>

<script>
export default {
  data() {
    return {
      agreementList: [false, false, false, false, false],
      agreements: [
        {
          text:
            "You understand that startups and small businesses are very risky. You acknowledge a potential 100% loss on all investments into Esgro using Wunderfund's technology.",
          value: true
        },
        {
          text:
            "You understand securities created via Wunderfund's technology are not easily resold. There is no secondary market for these particular securities offered.",
          value: true
        },
        {
          text:
            "You are savvy enough to understand the subject of crowdfunding. You have contacted the company (or posted in the comments!) with any questions you may have before starting this commitment process.",
          value: true
        },
        {
          text:
            "You understand that this platform (and the team behind it) cannot offer investment advice. You must have the sophistication and education necessary to evaluate investments on your own.",
          value: true
        },
        {
          text:
            "You acknowledge that the information regarding your identity and/or entity is true to your knowledge.",
          value: true
        }
      ]
    };
  },
  methods: {
    setValidity() {
      const validList = this.agreementList.every(x => x);
      this.$store.commit("checkout/SET_AGREEMENT_LIST_VALIDITY", validList);
    }
  }
};
</script>
