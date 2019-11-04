export const state = () => ({
  entities: [
    "Lion Share Holdings, LLC.",
    "Thrivera Venture I, LLC.",
    "Wunderfund, Inc."
  ]
});

export const getters = {
  entities: state => state.entities,
  hasEntities: state => state.entities.length > 0
};

export const mutations = {
  SET_ENTITY_LIST(state, payload) {
    state.entities = payload;
  }
};
