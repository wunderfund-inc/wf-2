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

    <!-- <div class="form-row mt-2">
      <div class="col">
        <div class="form-inline d-none d-md-block float-right">
          <button
            v-if="step < 4"
            @click="step++"
            class="btn btn-success btn-lg "
          >
            Continue
          </button>
          <b-link v-if="step > 1" @click="step--" class="text-muted ml-3">
            Go Back
          </b-link>
        </div>

        <div class="text-center d-block d-md-none">
          <button
            v-if="step < 4"
            @click="step++"
            class="btn btn-success btn-block mb-2"
          >
            Continue
          </button>
          <b-link v-if="step > 1" @click="step--" class="text-muted">
            Go Back
          </b-link>
        </div>
      </div>
    </div> -->

    <!--
    <template v-if="form.offering">
      <div class="form-row py-3">
        <div class="col">
          <input-payment-method
            :offering="getOffering(form.offering)"
            v-model="form.method"
          />
          <template v-if="form.method">
            <input-method-extras
              :method="form.method"
              v-model="form.methodExtras"
            />
          </template>
        </div>
      </div>

      <div class="form-row py-3">
        <div class="col">
          <input-attestations v-model="form.attestations" />
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <input-testimonial v-model="form.testimonial" />
        </div>
      </div>
    </template> -->
  </form>
</template>

<script>
import { mapGetters } from "vuex";
// import InputInvestmentType from "@/components/Form/Checkout/InputInvestmentType";
// import InputEntity from "@/components/Form/Checkout/InputEntity";
import InputOffering from "@/components/Form/Checkout/InputOffering";
import InputAmount from "@/components/Form/Checkout/InputAmount";
import InputPaymentMethod from "@/components/Form/Checkout/InputPaymentMethod";
import InputMethodExtras from "@/components/Form/Checkout/Methods/MethodLayout";
import InputAttestations from "@/components/Form/Checkout/InputAttestations";
import InputTestimonial from "@/components/Form/Checkout/InputTestimonial";
// import CheckoutSummary from "@/components/Form/Checkout/Summary";

export default {
  components: {
    // InputInvestmentType,
    // InputEntity,
    InputOffering,
    InputAmount,
    InputPaymentMethod,
    InputMethodExtras,
    InputAttestations,
    InputTestimonial
    // CheckoutSummary
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
