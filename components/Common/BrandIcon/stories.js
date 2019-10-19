import { storiesOf } from "@storybook/vue";
import { withKnobs, radios } from "@storybook/addon-knobs";

import BrandIcon from "./index.vue";

storiesOf("Common Components", module)
  .addDecorator(withKnobs)
  .add("Social Media Icons", () => ({
    components: { BrandIcon },
    props: {
      icons: {
        default: radios(
          "Icons",
          {
            Facebook: "facebook",
            "Facebook F": "facebook-f",
            "Facebook Square": "facebook-square",
            Twitter: "twitter",
            "Twitter Square": "twitter-square",
            Google: "google",
            Linkedin: "linkedin",
            "Youtube Square": "youtube-square"
          },
          "facebook"
        )
      }
    },
    template: `
      <div class="text-center text-light fa-3x" style="background-color: #003b5a">
        <b-container class="py-5" >
          <brand-icon :i="icons" />
        </b-container>
      </div>
    `
  }));
