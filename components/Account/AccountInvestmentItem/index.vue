<template lang="pug">
aside
  b-media.my-auto(vertical-align="center")
    template(#aside)
      b-img(thumbnail :src="investment.company.logo.url" width="80")
    b-row.form-inline
      b-col
        h2.mb-0.py-4.align-middle {{ investment.company.name.short }}
      b-col(cols="3").text-right
        b-button(
          variant="outline-secondary"
          v-b-toggle="`investment-${investment.company.uid}`"
          size="sm"
        )
          span.when-opened Close
          span.when-closed Expand
  b-collapse(:id="`investment-${investment.company.uid}`" accordion="investments")
    .row
      .col
        h4.mb-0.py-4 The Offering
    .row
      .col-12.col-sm-4
        h5 Raised:
        h6 {{ amountRaised | asCurrency }}
      .col-12.col-sm-4
        h5 Goal:
        h6 {{ investment.offering.goal.min | asCurrency }}
      .col-12.col-sm-4
        h5 Status:
        h6 8 days left!
    .row
      .col
        h4.mb-0.py-4 Your Investment
    .row
      .col-12.col-sm-4
        h5 Amount Invested:
        h6 {{ investment.amount | asCurrency }}
      .col-12.col-sm-4(v-if="investment.offering.securityType === 'EQUITY'")
        h5 Ownership (units):
        h6 {{ investment.amount / investment.offering.equity.pricePerShare }}
      .col-12.col-sm-4(v-if="investment.offering.securityType === 'EQUITY'")
        h5 Ownership (%):
        h6 {{ ((investment.amount / investment.offering.equity.pricePerShare)/investment.offering.equity.numberOfSecurities).toFixed(4) }}
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
      amountRaised: null
    };
  },
  async created() {
    const allInvestments = this.investment.offering.investments;
    const amounts = await Promise.all(
      allInvestments.map(async investment => {
        const investmentRef = await db
          .collection("investments")
          .doc(investment)
          .get();
        const investmentData = investmentRef.data();
        return investmentData.amount;
      })
    );
    this.amountRaised = amounts.reduce((total, val) => total + val);
  }
};
</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
