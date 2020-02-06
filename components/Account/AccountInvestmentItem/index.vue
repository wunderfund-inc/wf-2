<template lang="pug">
aside
  b-media.my-auto(vertical-align="center")
    template(#aside)
      b-img(
        v-if="investment.company.logo.url"
        :src="investment.company.logo.url"
        thumbnail
        width="80"
      )
    b-row.form-inline
      b-col
        h2.mb-0.py-4.align-middle {{ investment.company.name.short }}
      b-col(cols="3").text-right
        b-button(
          variant="outline-success"
          v-b-toggle="`investment-${investment.uid}`"
          size="sm"
        )
          span.when-opened Close
          span.when-closed Details
  b-collapse(:id="`investment-${investment.uid}`" accordion="investments")
    .row
      .col
        h4.mb-0.py-4 The Offering
    .row
      .col-12.col-sm-4
        h5 Raised:
        h6 {{ totalRaised | asCurrency }}
      .col-12.col-sm-4
        h5 Goal:
        h6 {{ investment.offering.goal.min | currencyDisplayFormat }} - {{ investment.offering.goal.max | currencyDisplayFormat }}
      .col-12.col-sm-4
        h5 Status:
        h6 {{ investment.offering.date.end | timeDistance }} left
    .row
      .col
        h4.mb-0.py-4 Your Investment
    .row
      .col-12.col-sm-4
        h5 Amount Invested: #[small.text-success {{ investment.amount | asCurrency }}]
        h5 Transaction Method: #[small.text-success {{ investment.method }}]
      .col-12.col-sm-4(v-if="investment.offering.securityType === 'EQUITY'")
        h5 Ownership (units):
        h6 {{ investment.amount / investment.offering.equity.pricePerShare }}
      .col-12.col-sm-4(v-if="investment.offering.securityType === 'EQUITY'")
        h5 Ownership (%):
        h6 {{ ((investment.amount / investment.offering.equity.pricePerShare)/investment.offering.equity.numberOfSecurities).toFixed(4) }}
    .row.py-4
      .col
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
      totalRaised: null
    };
  },
  async created() {
    try {
      const offeringId = this.investment.offeringId;

      const querySnapshot = await db
        .collection(`offerings/${offeringId}/investments`)
        .get();

      const investments = querySnapshot.docs.map(investment => {
        return investment.data();
      });

      const amounts = investments.map(investment => investment.amount);

      this.totalRaised = amounts.reduce((total, val) => total + val);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
