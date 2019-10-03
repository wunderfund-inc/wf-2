import { storiesOf } from "@storybook/vue";

import MainButton from "./index.vue";

storiesOf("Main Button", module).add("Normal text", () => ({
  components: { MainButton },
  template: `
    <b-container class="py-5">
      <main-button txt="Story Time!" />
    </b-container>
  `
}));
