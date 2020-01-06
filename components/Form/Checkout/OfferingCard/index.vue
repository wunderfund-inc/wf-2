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
          span.form-check-label Regulation {{ offering | regulationFormat }}
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
export default {
  props: {
    offering: {
      type: String,
      required: true
    }
  },
  computed: {
    selectedOffering: {
      get() {
        return this.$store.getters["checkout/selectedOffering"];
      },
      async set(val) {
        await this.$store.dispatch("checkout/setOffering", val);
        if (val === "CF") {
          await this.$store.dispatch("offering/SET_REG_CF_DATA");
        } else if (val === "D") {
          await this.$store.dispatch("offering/SET_REG_D_DATA");
        }
      }
    },
    personallyQualified() {
      const selectedType = this.$store.getters["checkout/selectedType"];
      const isPersonal = selectedType === "PERSONAL";
      const isAccredited = this.$store.getters["user/currentUser"].accredited;
      return isPersonal && isAccredited;
    },
    selectedEntityQualified() {
      const selectedEntity = this.$store.getters["checkout/selectedEntity"];
      if (selectedEntity) {
        const entityIsAccredited = this.$store.getters["user/getEntityById"](
          selectedEntity.uid
        );
        const isEntity =
          this.$store.getters["checkout/selectedType"] === "ENTITY";
        return isEntity && entityIsAccredited;
      }
      return false;
    },
    qualified() {
      if (this.offering === "CF") return true;
      return this.personallyQualified || this.selectedEntityQualified;
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
