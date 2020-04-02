<template>
  <div class="form-group">
    <label for="cc-number">Credit Card Number</label>
    <input
      id="cc-number"
      v-model.trim="ccNumber"
      v-mask="'#### #### #### ####'"
      class="form-control"
      type="text"
      placeholder="4242 4242 4242 4242"
    />
  </div>
</template>

<script>
export default {
  computed: {
    ccNumber: {
      get() {
        return this.$store.getters["checkout/cc"].number;
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_ATTRIBUTE", { number: val });
      }
    }
  }
};
</script>
