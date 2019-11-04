<template lang="pug">
  b-form-group(label="Which type of investment is this?")
    b-form-radio-group
      b-form-radio(
        value="PERSONAL" 
        v-model="selectedType" 
        name="selected-type"
      ) A Personal investment.
      b-form-radio(
        value="ENTITY" 
        v-model="selectedType" 
        name="selected-type"
        :disabled="!hasEntities"
      ) An investment on behalf an Entity.
        br(v-if="!hasEntities")
        small.text-muted(v-if="!hasEntities") You don't have any entities filed. Apply Here!
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
    },
    hasEntities() {
      // return false;
      return this.$store.getters["user/hasEntities"];
    }
  }
};
</script>
