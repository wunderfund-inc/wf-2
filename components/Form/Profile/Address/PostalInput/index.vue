<template lang="pug">
  b-form-group(
    label="Zip Code"
    label-for="profile-postal"
  )
    b-form-input#profile-postal(v-model="postal" trim)
</template>

<script>
import { validPostal } from "@/plugins/validators";

export default {
  computed: {
    postal: {
      get() {
        return this.$store.getters["user/address"].postal;
      },
      set(val) {
        this.$store.commit("user/SET_ADDRESS_ATTRIBUTE", { postal: val });
      }
    },
    isValid() {
      return validPostal(this.postal);
    }
  }
};
</script>
