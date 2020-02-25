<template lang="pug">
  b-form-group(
    label="Estimated Annual Revenue"
    label-for="entity-annual-revenue"
  )
    money#entity-annual-revenue.form-control(
      v-model="ai"
      v-bind="moneyConfig"
    )
</template>

<script>
import { Money } from "v-money";

export default {
  components: { Money },
  data() {
    return {
      moneyConfig: {
        decimal: ".",
        thousands: ",",
        prefix: "USD $",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  computed: {
    ai: {
      get() {
        return this.$store.getters["user/entityForm"].ai;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          ai: val
        });
      }
    }
  }
};
</script>
