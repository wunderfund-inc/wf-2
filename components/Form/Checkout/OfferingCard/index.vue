<template lang="pug">
  div
    label.card.py-2.pl-1(:class="cardBorder(offering)")
      .container
        .form-row.form-check-inline
          b-form-radio.form-check-input(
            :disabled="!qualified"
            :value="offering"
            size="lg"
            v-model="selectedOffering"
          )
          span.form-check-label Regulation {{ offering.offeringType | regulationFormat }}
        .form-row
          slot
            span
              small.text-muted Detail Line 1
              br
              small.text-muted Detail Line 2
    nuxt-link(to="/faq/investor")
      small.py-2.pl-2.text-muted(v-if="!qualified") Why can't I invest in this offering?
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    offering: {
      type: Object,
      default() {},
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "user/currentUser",
      selectedType: "checkout/selectedType",
      selectedEntity: "checkout/selectedEntity"
    }),
    selectedOffering: {
      get() {
        return this.$store.getters["checkout/selectedOffering"];
      },
      async set(val) {
        await this.$store.dispatch("checkout/setOffering", val);
      }
    },
    personallyQualified() {
      return this.currentUser.accredited && this.selectedType === "PERSONAL";
    },
    selectedEntityQualified() {
      return this.selectedEntity && this.selectedEntity.accredited;
    },
    qualified() {
      if (this.offering.offeringType === "CF") {
        return true;
      } else if (this.selectedType === "ENTITY") {
        return this.selectedEntity.accredited;
      } else if (this.selectedType === "PERSONAL") {
        return this.currentUser.accredited;
      }
      return false;
    }
  },
  methods: {
    cardBorder(val) {
      const whichCard = this.selectedOffering === val;
      return whichCard ? "border-primary" : "border-transparent";
    }
  }
};
</script>
