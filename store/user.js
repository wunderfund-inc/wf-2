const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  investments: [],
  currentUser: null,
  form: {
    entity: {
      name: null,
      classification: null,
      ein: null,
      differentEmail: false,
      email: null,
      accredited: false,
      annualRevenue: null,
      netAssets: null,
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null
      }
    },
    password: {
      old: null,
      new: null
    },
    profile: {
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null
      },
      name: {
        first: null,
        last: null
      }
    }
  }
});

export const getters = {
  accredited: state => state.currentUser.accredited,
  entityForm: state => state.form.entity,
  entityAddress: state => state.form.entity.address,
  password: state => state.form.password,
  address: state => state.form.profile.address,
  name: state => state.form.profile.name,
  validProfileForm: state => {
    const name = state.form.profile.name;
    const address = state.form.profile.address;
    return (
      name.first &&
      name.last &&
      address.street1 &&
      address.city &&
      address.state &&
      address.postal
    );
  },
  passwordsMatch: state => {
    const password = state.form.password;
    return password.old === password.new;
  },
  validPasswordChange: state => {
    const password = state.form.password;
    if (!password.old && !password.new) return null;
    if (password.old && password.new) {
      return password.old !== password.new && password.new.length >= 6;
    }
    return false;
  },
  entities: state => state.currentUser.entities,
  investments: state => state.investments,
  currentUser: state => state.currentUser,
  entitySelection: state => {
    const entityList = state.entities;
    return entityList.map(el => {
      return { value: el, text: el.name };
    });
  },
  getEntityById: state => uid => {
    if (uid) return state.entities.find(entity => entity.uid === uid);
    return null;
  }
};

export const mutations = {
  SET_ENTITY_FORM_ATTRIBUTE(state, payload) {
    const entity = state.form.entity;
    state.form.entity = Object.assign(cloneDeep(entity), payload);
  },
  SET_ENTITY_ADDRESS_ATTRIBUTE(state, payload) {
    const address = state.form.entity.address;
    state.form.entity.address = Object.assign(cloneDeep(address), payload);
  },
  SET_PROFILE_NAME_ATTRIBUTE(state, payload) {
    const name = state.form.profile.name;
    state.form.profile.name = Object.assign(cloneDeep(name), payload);
  },
  SET_PROFILE_ADDRESS_ATTRIBUTE(state, payload) {
    const address = state.form.profile.address;
    state.form.profile.address = Object.assign(cloneDeep(address), payload);
  },
  SET_PASSWORD_ATTRIBUTE(state, payload) {
    const password = state.form.password;
    state.form.password = Object.assign(cloneDeep(password), payload);
  },
  SET_ENTITY_LIST(state, payload) {
    state.entities = payload;
  },
  SET_CURRENT_USER_PROFILE(state, payload) {
    state.currentUser.profile = payload;
  },
  SET_CURRENT_USER(state, payload) {
    state.currentUser = payload;
  },
  SET_INVESTMENTS(state, payload) {
    state.investments = payload;
  }
};

export const actions = {
  setPasswordAttribute({ commit }, payload) {
    commit("SET_PASSWORD_ATTRIBUTE", payload);
  },
  setProfileNameAttribute({ commit }, payload) {
    commit("SET_PROFILE_NAME_ATTRIBUTE", payload);
  },
  setProfileAddressAttribute({ commit }, payload) {
    commit("SET_PROFILE_ADDRESS_ATTRIBUTE", payload);
  },
  setCurrentUser({ commit }, payload) {
    commit("SET_CURRENT_USER", payload);
  },
  setCurrentUserProfile({ commit }, payload) {
    commit("SET_CURRENT_USER_PROFILE", payload);
  },
  setInvestments({ commit }, payload) {
    commit("SET_INVESTMENTS", payload);
  }
};
