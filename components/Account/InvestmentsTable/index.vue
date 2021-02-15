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
      <span v-if="data.item.type === 'SHARES'">
        {{ (data.item.amount * data.item.pricePerShare) | asCurrency }}
      </span>
      <span v-else>
        {{ data.item.amount | asCurrency }}
      </span>
    </template>

    <template v-slot:cell(method)="data">
      {{ data.item.method | paymentMethodFormat }}
    </template>

    <template v-slot:cell(download)="data">
      <b-button
        v-if="data.item.tradeId"
        size="sm"
        :disabled="data.item.loading"
        @click="view(data)"
      >
        <b-spinner v-if="data.item.loading" small />
        <span v-else>View Agreement</span>
      </b-button>
      <div v-else>
        <p>Not uploaded (yet)</p>
      </div>
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
        "amount",
        "method",
        { key: "download", label: "Agreement" },
      ],
      error: null,
    };
  },
  computed: {
    investments() {
      return this.$store.state.investments.investments.map((el) => {
        return { ...el, loading: false };
      });
    },
  },
  methods: {
    async view(investment) {
      try {
        investment.item.loading = true;
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
        this.error = error;
      } finally {
        investment.item.loading = false;
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
    },
  },
};
</script>
