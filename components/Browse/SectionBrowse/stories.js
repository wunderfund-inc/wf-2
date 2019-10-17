import { storiesOf } from "@storybook/vue";

import d from "../data.json";
import ListOfCampaigns from "./index.vue";

export const campaigns = d.campaigns;

storiesOf("Browse Page Components", module).add("List of Campaigns", () => ({
  components: { ListOfCampaigns },
  data() {
    return { campaigns };
  },
  template: `
    <b-container class="py-5">
      <list-of-campaigns :campaigns="campaigns" />
    </b-container>
  `
}));
