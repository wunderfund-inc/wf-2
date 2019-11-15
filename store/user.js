export const state = () => ({
  passwordOld: null,
  passwordNew: null,
  entities: [
    // "Lion Share Holdings, LLC.",
    // "Thrivera Venture I, LLC.",
    // "Wunderfund, Inc."
  ],
  userData: {}
});

export const getters = {
  passwordOld: state => state.passwordOld,
  passwordNew: state => state.passwordNew,
  passwordsMatch: state => {
    return state.passwordOld === state.passwordNew;
  },
  entities: state => state.entities,
  hasEntities: state => state.entities.length > 0,
  userData: state => state.userData
};

export const mutations = {
  SET_ENTITY_LIST(state, payload) {
    state.entities = payload;
  },
  SET_OLD_PASSWORD(state, payload) {
    state.passwordOld = payload;
  },
  SET_NEW_PASSWORD(state, payload) {
    state.passwordNew = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  }
};

export const actions = {
  async LOGOUT_USER({ commit }) {
    await commit("SET_USER_DATA", null);
  }
};
