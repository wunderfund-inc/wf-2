<template lang="pug">
  section
    b-card(header="Commitment Summary" header-class="text-center")
      b-card-text Hello! My name is #[strong Justin Chiou].
      b-card-text(v-if="validPersonal") I want to personally invest in the #[strong Regulation] #[strong {{ selectedOffering }}] offering of #[strong Esoteric Brewing].
      b-card-text(v-if="validEntity") I want to invest in the #[strong Regulation] #[strong {{ selectedOffering }}] offering of #[strong Esoteric Brewing] on behalf of #[strong {{ entityName }}].
      //- b-card-text I'm committing #[strong $100.00] and paying via #[strong a check].
      //- b-card-text I've understood and agree to the terms necessary for this investment to be valid.
      //- b-button(block variant="success") Invest Now
</template>

<script>
export default {
  computed: {
    selectedType() {
      return this.$store.getters["checkout/selectedType"];
    },
    selectedOffering() {
      return this.$store.getters["checkout/selectedOffering"];
    },
    selectedEntity() {
      return this.$store.getters["checkout/selectedEntity"];
    },
    entityName() {
      return this.selectedEntity.name;
    },
    validPersonal() {
      return this.selectedType === "PERSONAL" && this.selectedOffering;
    },
    validEntity() {
      return (
        this.selectedType === "ENTITY" &&
        this.selectedEntity &&
        this.selectedOffering
      );
    }
  }
};
</script>
