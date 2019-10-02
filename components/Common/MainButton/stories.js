import { storiesOf } from "@storybook/vue";

import MainButton from "./index.vue";

storiesOf("Common Components", module).add("Main Button", () => ({
  components: { MainButton },
  template: `
    <main-button txt="Story Time!" />
  `
}));
