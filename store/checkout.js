export const state = () => ({
  selectedOffering: null,
  transactionAmount: null,
  selectedMethod: null,
  selectedType: null,
  selectedEntity: null,
  ach: {
    accountNumber: null,
    routingNumber: null
  },
  cc: {
    name: null,
    number: null,
    cvv: null,
    expiry: null
  }
});

export const getters = {
  notQualified: () => true,
  selectedOffering: state => state.selectedOffering,
  transactionAmount: state => state.transactionAmount,
  selectedMethod: state => state.selectedMethod,
  selectedType: state => state.selectedType,
  selectedEntity: state => state.selectedEntity,
  achAccountNumber: state => state.ach.accountNumber,
  achRoutingNumber: state => state.ach.routingNumber,
  ccCardholderName: state => state.cc.name,
  ccCardNumber: state => state.cc.number,
  ccCVV: state => state.cc.cvv,
  ccExpiration: state => state.cc.expiry
};

export const mutations = {
  SET_OFFERING: (state, payload) => (state.selectedOffering = payload),
  SET_TRANSACTION_AMOUNT: (state, payload) =>
    (state.transactionAmount = payload),
  SET_PAYMENT_METHOD: (state, payload) => (state.selectedMethod = payload),
  SET_TRANSACTION_TYPE: (state, payload) => (state.selectedType = payload),
  SET_ENTITY: (state, payload) => (state.selectedEntity = payload),
  SET_ACH_ACCOUNT_NUMBER: (state, payload) =>
    (state.ach.accountNumber = payload),
  SET_ACH_ROUTING_NUMBER: (state, payload) =>
    (state.ach.routingNumber = payload),
  SET_CC_CARDHOLDER_NAME: (state, payload) => (state.cc.name = payload),
  SET_CC_CARD_NUMBER: (state, payload) => (state.cc.number = payload),
  SET_CC_CVV: (state, payload) => (state.cc.cvv = payload),
  SET_CC_EXPIRATION: (state, payload) => (state.cc.expiry = payload)
};
