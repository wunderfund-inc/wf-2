<template lang="pug">
  b-form-group(label="Expiration Month")
    b-form-select(v-model="ccExpiryMonth")
      template(v-slot:first)
        option(:value="null" disabled) -- Please Select --
      option(v-for="(month, index) in months" :key="index" :value="month.value") {{ month.text }}
</template>

<script>
export default {
  data() {
    return {
      months: [
        { value: "01", text: "January" },
        { value: "02", text: "February" },
        { value: "03", text: "March" },
        { value: "04", text: "April" },
        { value: "05", text: "May" },
        { value: "06", text: "June" },
        { value: "07", text: "July" },
        { value: "08", text: "August" },
        { value: "09", text: "September" },
        { value: "10", text: "October" },
        { value: "11", text: "November" },
        { value: "12", text: "December" }
      ]
    };
  },
  computed: {
    ccExpiryMonth: {
      get() {
        return this.$store.getters["checkout/ccExpiry"].month;
      },
      set(val) {
        this.$store.commit("checkout/SET_CC_EXPIRY_ATTRIBUTE", { month: val });
      }
    }
  }
};
</script>
