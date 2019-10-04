import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

import MainButton from "./index.vue";

storiesOf("Main Button", module)
  .addDecorator(withKnobs)
  .add("Variable text input", () => ({
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
