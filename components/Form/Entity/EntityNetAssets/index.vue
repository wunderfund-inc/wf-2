<template lang="pug">
  b-form-group(
    label="Estimated Net Assets"
    label-for="entity-net-assets"
  )
    money#entity-net-assets.form-control(
      v-model="nw"
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
    nw: {
      get() {
        return this.$store.getters["user/entityForm"].accreditation.nw;
      },
      set(val) {
        if (val !== this.nw) {
          this.$store.dispatch("user/setEntityAccreditation", { nw: val });
        }
      }
    }
  }
};
</script>
