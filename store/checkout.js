export const state = () => ({
  selectedOffering: null,
  transactionAmount: null,
  selectedPaymentMethod: null
});

export const getters = {
  notQualified: () => true,
  selectedOffering: state => state.selectedOffering,
  transactionAmount: state => state.transactionAmount,
  selectedPaytmentMethod: state => state.selectedPaymentMethod
};

export const mutations = {
  SET_OFFERING(state, payload) {
    state.selectedOffering = payload;
  },
  SET_TRANSACTION_AMOUNT(state, payload) {
    state.transactionAmount = payload;
  },
  SET_PAYMENT_METHOD(state, payload) {
    state.selectedPaymentMethod = payload;
  }
};
