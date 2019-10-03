<template>
  <b-container class="section">
    <slot />
    <b-row>
      <b-col v-for="(campaign, index) in campaigns" :key="index" md="4">
        <browse-card
          :id="campaign.id"
          :card-img="campaign.cardImg"
          :company-name="campaign.companyName"
          :company-motto="campaign.companyMotto"
          :company-city="campaign.companyCity"
          :company-state="campaign.companyState"
          :offering-type="campaign.offeringType"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BrowseCard from "@/components/Common/BrowseCard";

export default {
  components: {
    BrowseCard
  },
  data() {
    return {
      campaigns: [
        {
          id: "1",
          cardImg: "https://picsum.photos/300/300/?image=41",
          companyName: "Esoteric Brewing Company",
          companyMotto: "More than just a beer",
          companyCity: "Cincinnati",
          companyState: "OH",
          offeringType: "A"
        }
      ]
    };
  }
};
</script>

<style scoped>
.section {
  padding: 40px 0 40px 0;
}
</style>
