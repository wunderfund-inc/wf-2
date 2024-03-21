<template>
  <b-table
    :items="investments"
    :fields="fields"
    responsive="sm"
    striped
    hover
    class="mb-0"
  >
    <template #cell(purchaseDate)="data">
      {{ (data.item.purchaseDate.seconds * 1000) | dateFormatLong }}
    </template>

    <template #cell(amount)="data">
      <span v-if="data.item.type === 'SHARES'">
        {{ (data.item.amount * data.item.pricePerShare) | asCurrency }}
      </span>
      <span v-else>
        {{ data.item.amount | asCurrency }}
      </span>
    </template>

    <template #cell(method)="data">
      {{ data.item.method | paymentMethodFormat }}
    </template>

    <template #cell(download)="data">
      <b-button
        v-if="data.item.agreementId"
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
import { downloadURL } from "~/plugins/firebase";

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
      investment.item.loading = true;
      try {
        const { agreementId } = investment.item;
        const url = await downloadURL("agreements", `${agreementId}.pdf`);
        window.open(url, "_blank");
      } catch (error) {
        this.error = error;
      }
      investment.item.loading = false;
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
