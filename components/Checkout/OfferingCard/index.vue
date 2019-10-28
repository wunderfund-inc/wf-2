<template lang="pug">
  label.card.py-2(:class="cardBorder(offering)")
    .container
      .form-row.form-check-inline
        b-form-radio.form-check-input(
          :value="offering"
          size="lg"
          v-model="selectedOffering"
        )
        span.form-check-label {{ offering | regulationFormat }}
      .form-row
        slot
          span
            small.text-muted Detail Line 1
            br
            small.text-muted Detail Line 2
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
      set(val) {
        this.$store.commit("checkout/SET_OFFERING", val);
      }
    }
  },
  methods: {
    cardBorder(val) {
      const whichCard = this.selectedOffering === val;
      return whichCard ? "border-success" : "border-transparent";
    }
  }
};
</script>
