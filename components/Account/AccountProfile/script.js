import SectionSpendLimit from "@/components/Account/SectionSpendLimit";
import SectionProfileForm from "@/components/Account/SectionProfileForm";
import SectionAccreditation from "@/components/Account/SectionAccreditation";
import SectionPasswordReset from "@/components/Account/SectionPasswordReset";

export default {
  components: {
    SectionSpendLimit,
    SectionProfileForm,
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
    },
    isAccredited: {
      type: Boolean,
      required: true
    }
  }
};
