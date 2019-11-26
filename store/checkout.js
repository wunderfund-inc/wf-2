const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  validAgreementList: false,
  selectedOffering: null,
  transactionAmount: null,
  selectedMethod: null,
  selectedType: null,
  selectedEntity: null,
  ach: {
    account: null,
    routing: null
  },
  cc: {
    name: null,
    number: null,
    cvv: null,
    expiryMonth: null,
    expiryYear: null
  },
  crypto: {
    address: null
  }
});

export const getters = {
  validAgreementList: state => state.validAgreementList,
  selectedOffering: state => state.selectedOffering,
  transactionAmount: state => state.transactionAmount,
  selectedMethod: state => state.selectedMethod,
  selectedType: state => state.selectedType,
  selectedEntity: state => state.selectedEntity,
  ach: state => state.ach,
  ccCardholderName: state => state.cc.name,
  ccCardNumber: state => state.cc.number,
  ccCVV: state => state.cc.cvv,
  ccExpiryMonth: state => state.cc.expiryMonth,
  ccExpiryYear: state => state.cc.expiryYear,
  ccExpiry: state => state.cc.expiryMonth + "/" + state.cc.expiryYear,
  cryptoAddress: state => state.crypto.address
};

export const mutations = {
  SET_AGREEMENT_LIST_VALIDITY: (state, payload) => {
    state.validAgreementList = payload;
  },
  SET_OFFERING: (state, payload) => (state.selectedOffering = payload),
  SET_TRANSACTION_AMOUNT: (state, payload) =>
    (state.transactionAmount = payload),
  SET_PAYMENT_METHOD: (state, payload) => (state.selectedMethod = payload),
  SET_TRANSACTION_TYPE: (state, payload) => (state.selectedType = payload),
  SET_ENTITY: (state, payload) => (state.selectedEntity = payload),
  SET_ACH_ATTRIBUTE: (state, payload) => {
    state.ach = Object.assign(cloneDeep(state.ach), payload);
  },
  SET_CC_CARDHOLDER_NAME: (state, payload) => (state.cc.name = payload),
  SET_CC_CARD_NUMBER: (state, payload) => (state.cc.number = payload),
  SET_CC_CVV: (state, payload) => (state.cc.cvv = payload),
  SET_CC_EXPIRY_MONTH: (state, payload) => (state.cc.expiryMonth = payload),
  SET_CC_EXPIRY_YEAR: (state, payload) => (state.cc.expiryYear = payload),
  SET_CRYPTO_ADDRESS: (state, payload) => (state.crypto.address = payload)
};
