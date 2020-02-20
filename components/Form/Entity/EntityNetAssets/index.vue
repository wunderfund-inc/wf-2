<template lang="pug">
  b-form-group(
    label="Estimated Net Assets"
    label-for="entity-net-assets"
  )
    money#entity-net-assets.form-control(
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
    netAssets: {
      get() {
        return this.$store.getters["user/entityForm"].netAssets;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", {
          netAssets: val
        });
      }
    }
  }
};
</script>
