import SectionSpendLimit from "@/components/Account/SectionSpendLimit";
import SectionAccreditation from "@/components/Account/SectionAccreditation";
import SectionPasswordReset from "@/components/Account/SectionPasswordReset";

export default {
  components: {
    SectionSpendLimit,
    SectionAccreditation,
    SectionPasswordReset
  },
  props: {
    spendPool: {
      type: Number,
      required: true
    },
    spendMax: {
      type: Number,
      required: true
    }
  }
};
