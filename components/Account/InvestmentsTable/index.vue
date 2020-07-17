<template>
  <b-table
    :items="investments"
    :fields="fields"
    responsive="sm"
    striped
    hover
    class="mb-0"
  >
    <template v-slot:cell(purchaseDate)="data">
      {{ (data.item.purchaseDate.seconds * 1000) | dateFormatLong }}
    </template>

    <template v-slot:cell(amount)="data">
      {{ data.item.amount | asCurrency }}
    </template>

    <template v-slot:cell(method)="data">
      {{ data.item.method | paymentMethodFormat }}
    </template>

    <template v-slot:cell(actions)="data">
      <b-dropdown size="sm" text="Choose">
        <b-dropdown-item @click="view(data)">
          Download Agreement
        </b-dropdown-item>
        <b-dropdown-item @click="cancel(data)">
          Cancel Investment
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-table>
</template>

<script>
import { downloadURL } from "@/plugins/firebase";

export default {
  data() {
    return {
      fields: [
        { key: "purchaseDate", label: "Date Purchased" },
        { key: "companyName", label: "Company" },
        { key: "amount", label: "Amount" },
        "method",
        "actions"
      ]
    };
  },
  computed: {
    investments() {
      return this.$store.state.investments.investments;
    }
  },
  methods: {
    async view(investment) {
      try {
        let url;
        const tradeId = investment.item.tradeId;
        if (tradeId) {
          const endpoint =
            "https://us-central1-wunderfund-server.cloudfunctions.net/documentOnRequest";
          const response = await this.$axios.$post(endpoint, { tradeId });
          url = response;
        } else {
          url = await downloadURL(
            "agreements",
            `${investment.item.agreementId}.pdf`
          );
        }
        window.open(url);
      } catch (error) {
        throw Error(error);
      }
    },
    cancel(investment) {
      const toCancel = confirm(
        "Are you sure you want to cancel your investment?"
      );

      if (toCancel) {
        // eslint-disable-next-line
        console.log("cancelling investment...");
        window.location.assign("mailto:taylor@wunderfund.co");
      }
    }
  }
};
</script>
