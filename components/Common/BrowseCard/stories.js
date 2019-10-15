import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

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

storiesOf("Common Components", module)
  .addDecorator(withKnobs)
  .add("Browse Card", () => ({
    components: { BrowseCard },
    props: {
      campaignData: {
        default: {
          id: text("Campaign ID", campaign.id),
          cardImg: text("Card Image", campaign.cardImg),
          companyName: text("Name of the Company", campaign.companyName),
          companyMotto: text("Company Motto", campaign.companyMotto),
          companyCity: text("Location (City)", campaign.companyCity),
          companyState: text("Location (State)", campaign.companyState),
          offeringType: text("Offering Type", campaign.offeringType)
        }
      }
    },
    template: `
      <b-container class="py-5">
        <b-row>
          <b-col cols="5">
            <browse-card :campaign="campaignData" />
          </b-col>
        </b-row>
      </b-container>
    `
  }));
