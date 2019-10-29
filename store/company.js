export const state = () => ({
  offerings: []
});

export const getters = {
  offerings: state => state.offerings
};

export const mutations = {
  SET_OFFERINGS(state, payload) {
    state.offerings = payload;
  }
};

export const actions = {
  async GET_OFFERINGS({ commit }) {
    await commit("SET_OFFERINGS", ["CF", "D"]);
    // await commit("SET_OFFERINGS", ["A"]);
  }
};
