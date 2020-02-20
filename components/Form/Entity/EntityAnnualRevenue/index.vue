<template lang="pug">
  b-form-group(
    label="Estimated Annual Revenue"
    label-for="entity-annual-revenue"
  )
    money#entity-annual-revenue.form-control(
      v-model="annualRevenue"
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
    annualRevenue: {
      get() {
        return this.$store.getters["user/entityForm"].annualRevenue;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          annualRevenue: val
        });
      }
    }
  }
};
</script>
