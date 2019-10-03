import { storiesOf } from "@storybook/vue";

import BrowseCard from "./index.vue";

export const campaign = {
  id: "1",
  cardImg: "https://picsum.photos/300/300/?image=41",
  companyName: "Esoteric Brewing Company",
  companyMotto: "More than just a beer",
  companyCity: "Cincinnati",
  companyState: "OH",
  offeringType: "A"
};

storiesOf("Common Components", module).add("Browse Card", () => ({
  components: { BrowseCard },
  data() {
    return {
      campaign
    };
  },
  template: `
    <b-container class="py-5">
      <b-row>
        <b-col cols="5">
          <browse-card :campaign="campaign" />
        </b-col>
      </b-row>
    </b-container>
  `
}));
