<template lang="pug">
  main#campaign
    campaign-content#campaign-content
</template>

<script>
import CampaignContent from "@/components/Campaign/CampaignContent";

export default {
  components: {
    CampaignContent
  },
  async fetch({ store, params }) {
    try {
      await store.dispatch("company/fetchCompany", params.companyId);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
