<template lang="pug">
  b-form-group(label="Which type of investment is this?")
    b-form-radio(
      value="PERSONAL" 
      v-model="selectedType" 
      name="selected-type"
    ) A Personal investment.
    b-form-radio(
      value="ENTITY" 
      v-model="selectedType" 
      name="selected-type"
    ) An investment on behalf an entity.
</template>

<script>
export default {
  computed: {
    selectedType: {
      get() {
        return this.$store.getters["checkout/transactionType"];
      },
      set(val) {
        this.$store.commit("checkout/SET_TRANSACTION_TYPE", val);
      }
    }
  }
};
</script>
