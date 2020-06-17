<template>
  <div>
    <b-form-group
      label-cols-lg="6"
      label="Investment processing brought to you by:"
      label-size="lg"
      label-class="font-weight-bold small"
    >
      <div class="row">
        <div class="col justify-content-center">
          <b-link
            href="https://www.northcapital.com/"
            target="_blank"
            class="mb-0"
          >
            <b-img thumbnail src="~assets/logo/tapi_secure.png" />
          </b-link>
        </div>
      </div>
    </b-form-group>
    <div class="form-group">
      <form-ach v-if="method === 'ACH'" />
      <form-credit-card v-if="method === 'CC'" />
      <form-check v-if="method === 'CHECK'" />
      <form-wire v-if="method === 'WIRE'" />
      <form-crypto v-if="method === 'CRYPTO'" />
    </div>
  </div>
</template>

<script>
import FormAch from "@/components/Form/Checkout/Methods/Ach";
import FormCreditCard from "@/components/Form/Checkout/Methods/CreditCard";
import FormCheck from "@/components/Form/Checkout/Methods/Check";
import FormWire from "@/components/Form/Checkout/Methods/Wire";
import FormCrypto from "@/components/Form/Checkout/Methods/Crypto";

export default {
  components: {
    FormAch,
    FormCreditCard,
    FormCheck,
    FormWire,
    FormCrypto
  },
  computed: {
    method() {
      return this.$store.state.agreement.method;
    }
  }
};
</script>
