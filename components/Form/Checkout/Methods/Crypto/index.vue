<template>
  <section>
    <div class="form-row">
      <div class="col">
        <b-form-group label="Ethereum Address" label-for="crypto-address">
          <b-form-input v-model="address" />
        </b-form-group>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    address: {
      get() {
        return this.$store.state.agreement.address;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "address",
          val
        });
      }
    }
  }
};
</script>
