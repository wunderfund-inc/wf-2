<template>
  <form @submit.prevent="updateAccreditation">
    <div class="form-row">
      <div class="col-md-6">
        <b-form-group
          :label="
            `Estimated ${isEntity ? 'Combined Revenues' : 'Annual Income'}`
          "
          label-for="annual-income"
        >
          <vue-numeric
            id="annual-income"
            v-model="ai"
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
            v-model="nw"
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

export default {
  components: { VueNumeric },
  computed: {
    ai: {
      get() {
        return this.$store.state.accreditation.ai;
      },
      set(val) {
        this.$store.dispatch("accreditation/setAttribute", { prop: "ai", val });
      }
    },
    nw: {
      get() {
        return this.$store.state.accreditation.nw;
      },
      set(val) {
        this.$store.dispatch("accreditation/setAttribute", { prop: "nw", val });
      }
    },
    isEntity() {
      return this.$store.state.profile.is_entity;
    },
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    }
  },
  created() {
    const {
      accreditation_ai: ai,
      accreditation_nw: nw
    } = this.$store.state.profile;
    this.$store.dispatch("accreditation/setAttribute", { prop: "ai", val: ai });
    this.$store.dispatch("accreditation/setAttribute", { prop: "nw", val: nw });
  },
  methods: {
    async updateAccreditation() {
      const userId = this.$store.state.auth.userId;
      await this.$store.dispatch("accreditation/update", userId);
      await window.location.reload();
    }
  }
};
</script>
