<template>
  <section>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <b-form-group label="Bank Account Number" label-for="ach-account">
          <the-mask
            id="ach-account"
            v-model="account"
            mask="################"
            placeholder="123456(7890123456)"
            class="form-control"
            type="tel"
          />
        </b-form-group>
      </div>
      <div class="col-12 col-md-6">
        <b-form-group label="Bank Routing Number" label-for="ach-routing">
          <the-mask
            id="ach-routing"
            v-model="routing"
            mask="#########"
            placeholder="123456789"
            class="form-control"
            type="tel"
          />
        </b-form-group>
      </div>
    </div>
  </section>
</template>

<script>
import { TheMask } from "vue-the-mask";

export default {
  components: {
    TheMask,
  },
  computed: {
    account: {
      get() {
        return this.$store.state.agreement.account;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "account",
          val,
        });
      },
    },
    routing: {
      get() {
        return this.$store.state.agreement.routing;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "routing",
          val,
        });
      },
    },
  },
};
</script>
