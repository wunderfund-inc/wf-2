const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  passwordOld: null,
  passwordNew: null,
  entities: [
    // "Lion Share Holdings, LLC.",
    // "Thrivera Venture I, LLC.",
    // "Wunderfund, Inc."
  ],
  userData: {},
  form: {
    entity: {
      name: null,
      type: null,
      ein: null,
      differentEmail: false,
      email: null,
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null
      }
    }
  },
  personal: {
    firstName: null,
    lastName: null
  },
  address: {
    street1: null,
    street2: null,
    city: null,
    state: null,
    postal: null
  }
});

export const getters = {
  address: state => state.address,
  entityForm: state => state.form.entity,
  personal: state => state.personal,
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
  SET_ENTITY_FORM_ATTRIBUTE(state, payload) {
    state.form.entity = Object.assign(cloneDeep(state.form.entity), payload);
  },
  SET_PERSONAL_ATTRIBUTE(state, payload) {
    state.personal = Object.assign(cloneDeep(state.personal), payload);
  },
  SET_ADDRESS_ATTRIBUTE(state, payload) {
    state.address = Object.assign(cloneDeep(state.address), payload);
  },
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
