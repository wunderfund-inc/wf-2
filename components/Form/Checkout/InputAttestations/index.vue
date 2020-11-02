<template>
  <b-form-group
    label="Finally, the following must be agreed upon:"
    label-size="lg"
    label-class="font-weight-bold pt-3"
  >
    <b-form-checkbox
      v-model="attestation1"
      value="The investor acknowledged a potential 100% loss on all investments into this company via Wunderfund's technology."
      class="py-2"
      switch
    >
      I understand that startups and small businesses are very risky. I
      acknowledge a potential 100% loss on all investments into this particular
      company, using Wunderfund's technology.
    </b-form-checkbox>
    <b-form-checkbox
      v-model="attestation2"
      value="The investor acknowledged the fact that securities sold on this platform are not easily resold."
      class="py-2"
      switch
    >
      I understand securities created via Wunderfund's technology are not easily
      resold. There is no secondary market for these particular securities
      offered.
    </b-form-checkbox>
    <b-form-checkbox
      v-model="attestation3"
      value="The investor acknowledged an understanding of crowdfunding."
      class="py-2"
      switch
    >
      I am savvy enough to understand the subject of crowdfunding. I have
      contacted the company (or posted in the comments) with any questions I may
      have before starting this commitment process.
    </b-form-checkbox>
    <b-form-checkbox
      v-model="attestation4"
      value="The investor acknowledged having the sophistication and education to evaluate this investment."
      class="py-2"
      switch
    >
      I understand that this platform (and the team behind it) cannot offer
      investment advice. I must have the sophistication and education necessary
      to evaluate investments on my own.
    </b-form-checkbox>
    <b-form-checkbox
      v-model="attestation5"
      value="The investor acknowledged accurate information regarding their personal identity (or the entity they represent)."
      class="py-2"
      switch
    >
      <span v-if="isEntity">
        I acknowledge that the information I have provided regarding the entity
        I represent is true to my knowledge.
      </span>
      <span v-else>
        I acknowledge that the information regarding my personal identity is
        true to my knowledge.
      </span>
    </b-form-checkbox>
  </b-form-group>
</template>

<script>
export default {
  computed: {
    attestation1: {
      get() {
        return this.$store.state.agreement.attestation1;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "attestation1",
          val,
        });
      },
    },
    attestation2: {
      get() {
        return this.$store.state.agreement.attestation2;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "attestation2",
          val,
        });
      },
    },
    attestation3: {
      get() {
        return this.$store.state.agreement.attestation3;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "attestation3",
          val,
        });
      },
    },
    attestation4: {
      get() {
        return this.$store.state.agreement.attestation4;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "attestation4",
          val,
        });
      },
    },
    attestation5: {
      get() {
        return this.$store.state.agreement.attestation5;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "attestation5",
          val,
        });
      },
    },
    isEntity() {
      return this.$store.state.profile.is_entity;
    },
  },
};
</script>
