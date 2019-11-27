<template lang="pug">
  b-card.mb-4(no-body)
    b-card-body.px-0
      b-container
        b-row.form-inline
          b-col
            h1.mb-0 My Profile
          b-col(cols="3").text-right
            b-button(variant="outline-success" v-b-toggle.profile size="sm")
              span.when-opened Close
              span.when-closed Expand
      b-collapse#profile.pt-4
        section-spend-limit(:spend-pool="spendPool" :spend-max="spendMax")
        section-profile-form
        section-accreditation(:is-accredited="isAccredited")
        section-password-reset
</template>

<script>
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
</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
