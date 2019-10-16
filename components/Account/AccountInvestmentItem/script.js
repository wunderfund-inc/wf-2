export default {
  props: {
    investment: {
      type: Object,
      default() {},
      companyId: {
        type: String,
        required: true
      },
      companyLogo: {
        type: String,
        required: true
      },
      companyNickname: {
        type: String,
        required: true
      },
      companyPricePerShare: {
        type: Number,
        required: false
      },
      companyUnitPrice: {
        type: Number,
        required: false
      },
      amount: {
        type: Number,
        required: true
      },
      agreementUrl: {
        type: String,
        required: true
      }
    }
  }
};
