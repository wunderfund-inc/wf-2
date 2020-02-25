<template lang="pug">
  section
    hr
    b-container
      h4.pb-3 Increase your investment limit!
      p Based on the #[b-link(href="https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/updated-investor-bulletin-accredited-investors" target="_blank") SEC standards], if you want to invest more than $2,200 annually on our platform, you're required to let us know that you qualify. Fill out the information below to update how much you're allowed to spend on our platform.
      form(@submit.prevent="updateAccreditation")
        .form-row
          .col-12.col-md-6
            b-form-group.text-left(
              label="Estimated Annual Income"
              label-for="ai"
              description=`Note: Must be over $200,000 to be considered "accredited"`
            )
              money#ai.form-control(
                v-model="form.ai"
                v-bind="moneyConfig"
              )
          .col-12.col-md-6
            b-form-group.text-left(
              label="Estimated Net Worth"
              label-for="nw"
              description=`Note: Must be over $1,000,000 to be considered "accredited"`
            )
              money#nw.form-control(
                v-model="form.nw"
                v-bind="moneyConfig"
              )
        .form-row
          .col-12
            b-form-checkbox.py-2(
              v-model="attestations[0]"
              value="The information above is true to my knowledge."
              switch
            ) The information above is true to my knowledge.
        .form-row
          .col-12
            b-form-checkbox.py-2(
              v-model="attestations[1]"
              value="I understand if at any point in time the above is not true, Wunderfund reserves the right to cancel any investments I make on the platform."
              switch
            ) I understand if at any point in time the above is not true, Wunderfund reserves the right to cancel any investments I make on the platform.
        b-form-row
          b-col
            b-button(
              variant="success"
              type="submit"
              :disabled="!validForm"
            )
              span.spinner-border.spinner-border-sm.mr-2(
                v-if="submitting"
                role="status"
                aria-hiden="true"
                style="margin-bottom: 4px"
              )
              span(v-if="submitting") Updating...
              span(v-if="!submitting") Attest
</template>

<script>
import { Money } from "v-money";
import { mapGetters } from "vuex";
import { db, timestamp } from "@/plugins/firebase";

export default {
  components: { Money },
  data() {
    return {
      form: {
        ai: 0,
        nw: 0
      },
      attestations: [],
      submitting: false,
      moneyConfig: {
        decimal: ".",
        thousands: ",",
        prefix: "USD $",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  computed: {
    ...mapGetters({
      accredited: "user/accredited",
      accreditation: "user/accreditation",
      userId: "user/userId"
    }),
    validForm() {
      return this.attestations.length === 2 && this.ai >= 0 && this.nw >= 0;
    }
  },
  methods: {
    async updateAccreditation() {
      this.submitting = true;
      await db
        .collection("users")
        .doc(this.userId)
        .update({ ...this.form, updatedAt: timestamp });
      await window.location.reload();
    }
  }
};
</script>
