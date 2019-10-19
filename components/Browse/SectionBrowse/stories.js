import { storiesOf } from "@storybook/vue";

import d from "../data.json";
import ListOfCampaigns from "./index.vue";

export const campaigns = d.campaigns;

storiesOf("Page - Browse", module).add("Section - Campaign Cards", () => ({
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
