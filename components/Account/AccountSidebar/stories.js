import { storiesOf } from "@storybook/vue";

import AccountSidebar from "./index.vue";

storiesOf("Account Page Components", module).add("Account Sidebar", () => ({
  components: { AccountSidebar },
  template: `
    <b-container class="py-5">
      <b-row>
        <b-col cols="3">
          <account-sidebar />
        </b-col>
      </b-row>
    </b-container>
  `
}));
