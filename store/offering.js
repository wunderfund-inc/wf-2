export const state = () => ({
  securityType: null,
  minimumInvestmentAmount: null,
  availablePaymentMethods: null
});

export const getters = {
  securityType: state => state.securityType,
  minimumInvestmentAmount: state => state.minimumInvestmentAmount,
  availablePaymentMethods: state => state.availablePaymentMethods
};

export const mutations = {
  SET_SECURITY_TYPE: (state, payload) => (state.securityType = payload),
  SET_MINIMUM_INVESTMENT(state, payload) {
    state.minimumInvestmentAmount = payload;
  },
  SET_PAYMENT_METHODS: (state, payload) => {
    state.availablePaymentMethods = payload;
  }
};

export const actions = {
  async SET_OFFERING_DATA({ commit }) {
    await commit("SET_SECURITY_TYPE", "CF");
    await commit("SET_MINIMUM_INVESTMENT", 20);
    await commit("SET_PAYMENT_METHODS", ["ACH", "CHECK", "WIRE"]);
  }
};
