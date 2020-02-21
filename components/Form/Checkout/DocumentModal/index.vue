<template lang="pug">
  b-modal(
    v-model="showAgreementModal"
    title="Signing the Agreement"
    size="xl"
    hide-footer
    no-close-on-backdrop
  )
    b-embed(type="iframe" :src="agreementUrl")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      agreementUrl: "checkout/agreementUrl"
    }),
    showAgreementModal: {
      get() {
        return this.$store.getters["checkout/showAgreementModal"];
      },
      set(val) {
        this.$store.commit("checkout/SHOW_AGREEMENT_MODAL", val);
      }
    }
  }
};
</script>
