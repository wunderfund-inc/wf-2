<template>
  <form @submit.prevent="updateAccreditation">
    <div class="form-row">
      <div class="col-md-6">
        <b-form-group
          :label="`Estimated ${
            isEntity ? 'Combined Revenues' : 'Annual Income'
          }`"
          label-for="annual-income"
        >
          <vue-numeric
            id="annual-income"
            v-model="form.annualIncome"
            currency="$"
            separator=","
            class="form-control"
            type="tel"
          />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          :label="`Estimated ${isEntity ? 'Net Assets' : 'Net Worth'}`"
          label-for="net-worth"
        >
          <vue-numeric
            id="net-worth"
            v-model="form.netWorth"
            currency="$"
            separator=","
            class="form-control"
            type="tel"
          />
        </b-form-group>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <b-button :variant="color" type="submit">Update</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import VueNumeric from "vue-numeric";
import { db, timestamp } from "@/plugins/firebase";

export default {
  components: { VueNumeric },
  props: {
    ai: {
      type: Number,
      default: () => 0,
      required: false,
    },
    nw: {
      type: Number,
      default: () => 0,
      required: false,
    },
    isEntity: {
      type: Boolean,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      form: {
        annualIncome: 0,
        netWorth: 0,
      },
    };
  },
  computed: {
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
  created() {
    this.form.annualIncome = this.ai;
    this.form.netWorth = this.nw;
  },
  methods: {
    async updateAccreditation() {
      const userId = this.$store.state.auth.userId;
      await db.collection("users").doc(userId).update({
        accreditation_ai: this.form.annualIncome,
        accreditation_nw: this.form.netWorth,
        date_updated: timestamp,
        flag: "update:accreditation",
      });
      window.location.replace("/account?action=accreditation_updated");
    },
  },
};
</script>
