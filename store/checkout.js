export const state = () => ({
  selectedOffering: null,
  transactionAmount: null,
  selectedMethod: null,
  selectedType: null,
  selectedEntity: null
});

export const getters = {
  notQualified: () => true,
  selectedOffering: state => state.selectedOffering,
  transactionAmount: state => state.transactionAmount,
  selectedMethod: state => state.selectedMethod,
  selectedType: state => state.selectedType,
  selectedEntity: state => state.selectedEntity
};

export const mutations = {
  SET_OFFERING(state, payload) {
    state.selectedOffering = payload;
  },
  SET_TRANSACTION_AMOUNT(state, payload) {
    state.transactionAmount = payload;
  },
  SET_PAYMENT_METHOD(state, payload) {
    state.selectedMethod = payload;
  },
  SET_TRANSACTION_TYPE(state, payload) {
    state.selectedType = payload;
  },
  SET_ENTITY(state, payload) {
    state.selectedEntity = payload;
  }
};
