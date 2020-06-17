<template>
  <form @submit.prevent novalidate class="form">
    <section class="card bg-light mb-3">
      <div class="container">
        <h5 class="card-title my-4 font-weight-bold">
          Select which offering you want to invest in below:
        </h5>

        <div class="form-row pb-4">
          <div
            v-for="(offering, index) in offerings"
            :key="index"
            class="col-12 col-md-6"
          >
            <input-offering :offering="offering" />
          </div>
        </div>
      </div>
    </section>

    <section v-if="$store.state.agreement.offering" class="card bg-light my-3">
      <div class="container">
        <input-amount />
      </div>
    </section>

    <section v-if="validAmount" class="card bg-light my-3">
      <div class="container">
        <input-payment-method />
        <div v-if="$store.state.agreement.method" class="form-row mt-3">
          <div class="col">
            <input-method-extras />
          </div>
        </div>
      </div>
    </section>

    <section v-if="validAmount && validMethod" class="card bg-light my-3">
      <div class="container">
        <input-attestations />
      </div>
    </section>

    <section v-if="validAttestations" class="card bg-light my-3">
      <div class="container">
        <input-testimonial />
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import InputOffering from "@/components/Form/Checkout/InputOffering";
import InputAmount from "@/components/Form/Checkout/InputAmount";
import InputPaymentMethod from "@/components/Form/Checkout/InputPaymentMethod";
import InputMethodExtras from "@/components/Form/Checkout/Methods/MethodLayout";
import InputAttestations from "@/components/Form/Checkout/InputAttestations";
import InputTestimonial from "@/components/Form/Checkout/InputTestimonial";

export default {
  components: {
    InputOffering,
    InputAmount,
    InputPaymentMethod,
    InputMethodExtras,
    InputAttestations,
    InputTestimonial
  },
  props: {
    offerings: {
      type: Array,
      default() {},
      required: true
    }
  },
  computed: {
    ...mapGetters({
      validAmount: "agreement/validAmount",
      validMethod: "agreement/validMethod",
      validAttestations: "agreement/validAttestations"
    })
  }
};
</script>
