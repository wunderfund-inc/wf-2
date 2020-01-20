<template lang="pug">
aside
  b-media.my-auto(vertical-align="center")
    template(#aside)
      b-img(thumbnail :src="company.logo.url" width="80")
    b-row.form-inline
      b-col
        h2.mb-0.py-4.align-middle {{ company.name.short }}
      b-col(cols="3").text-right
        b-button(
          variant="outline-secondary"
          v-b-toggle="`investment-${company.uid}`"
          size="sm"
        )
          span.when-opened Close
          span.when-closed Expand
  b-collapse(:id="`investment-${company.uid}`" accordion="investments")
    b-row
      b-col
        h4.mb-0.py-4 The Offering
    b-row
      b-col
        h5 Raised:
        h6 $9,650.00
      b-col
        h5 Goal:
        h6 $10,000.00
      b-col
        h5 Status:
        h6 8 days left!
    b-row
      b-col
        h4.mb-0.py-4 Your Investment
    b-row
      b-col
        h5 Amount Invested:
        h6 {{ investment.amount | asCurrency }}
      b-col
        h5 Ownership (units):
        h6 {{ investment.amount / investment.companyUnitPrice }}
      b-col
        h5 Ownership (%):
        h6 {{ (investment.amount / investment.companyPricePerShare).toFixed(4) }}
    b-row.py-4
      b-col
        b-button(size="lg") View Agreement
</template>

<script>
import { db } from "@/plugins/firebase";

export default {
  props: {
    investment: {
      type: Object,
      default() {},
      required: true
    }
  },
  data() {
    return {
      company: null,
      offering: null
    };
  },
  async created() {
    const company = await db
      .collection("companies")
      .doc(this.investment.companyId)
      .get();
    this.company = company.data();

    const offering = await db
      .collection("offerings")
      .doc(this.investment.offeringId)
      .get();
    this.offering = offering.data();
  }
};
</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
