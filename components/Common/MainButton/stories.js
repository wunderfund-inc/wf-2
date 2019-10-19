import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

import MainButton from "./index.vue";

storiesOf("Common Components", module)
  .addDecorator(withKnobs)
  .add("Main Button", () => ({
    components: { MainButton },
    props: {
      text: {
        type: String,
        default: () => text("Text", "Story Time")
      }
    },
    template: `
      <b-container class="py-5">
        <main-button>{{text}}</main-button>
      </b-container>
    `
  }));
