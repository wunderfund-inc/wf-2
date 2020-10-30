<template>
  <b-form-group
    label-cols-lg="6"
    label="How would you like to pay?"
    label-size="lg"
    label-class="font-weight-bold pt-3"
    class="mb-0"
  >
    <div class="py-3">
      <b-form-radio
        v-if="offering.payment_method_ach"
        v-model="method"
        value="ACH"
        name="selected-method"
      >
        ACH (Bank Transfer)
      </b-form-radio>
      <b-form-radio
        v-if="offering.payment_method_cc"
        v-model="method"
        value="CC"
        name="selected-method"
      >
        a Credit Card
      </b-form-radio>
      <b-form-radio
        v-if="offering.payment_method_check"
        v-model="method"
        value="CHECK"
        name="selected-method"
      >
        a Check
      </b-form-radio>
      <b-form-radio
        v-if="offering.payment_method_wire"
        v-model="method"
        value="WIRE"
        name="selected-method"
      >
        a Wire Transfer
      </b-form-radio>
      <b-form-radio
        v-if="offering.payment_method_crypto"
        v-model="method"
        value="CRYPTO"
        name="selected-method"
      >
        Cryptocurrency (Ethereum)
      </b-form-radio>
    </div>
  </b-form-group>
</template>

<script>
export default {
  computed: {
    offering() {
      return this.$store.state.agreement.offering;
    },
    method: {
      get() {
        return this.$store.state.agreement.method;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", { prop: "method", val });
      },
    },
  },
};
</script>
