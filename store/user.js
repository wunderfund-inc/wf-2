export const state = () => ({
  passwordOld: null,
  passwordNew: null,
  entities: [
    "Lion Share Holdings, LLC.",
    "Thrivera Venture I, LLC.",
    "Wunderfund, Inc."
  ]
});

export const getters = {
  passwordOld: state => state.passwordOld,
  passwordNew: state => state.passwordNew,
  passwordsMatch: state => state.passwordOld !== state.passwordNew,
  entities: state => state.entities,
  hasEntities: state => state.entities.length > 0
};

export const mutations = {
  SET_ENTITY_LIST(state, payload) {
    state.entities = payload;
  },
  SET_OLD_PASSWORD(state, payload) {
    state.passwordOld = payload;
  },
  SET_NEW_PASSWORD(state, payload) {
    state.passwordOld = payload;
  }
};
