const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  entities: [
    // {
    //   uid: "asdfqwer",
    //   name: "Lion Share Holdings, LLC.",
    //   classification: "C-Corporation",
    //   ein: "12-1234567",
    //   differentEmail: true,
    //   email: "justin@wunderfund.co",
    //   accredited: true,
    //   annualRevenue: 1000000,
    //   netAssets: 5000000,
    //   address: {
    //     street1: "1053 Saint Gregory Street",
    //     street2: "Floor 2",
    //     city: "Cincinnati",
    //     state: "OH",
    //     postal: "45208"
    //   }
    // }
  ],
  investments: [
    // {
    //   companyId: "1",
    //   companyLogo:
    //     "http://33ngfg4d8cu73qlgogo5zau1.wpengine.netdna-cdn.com/wp-content/uploads/2017/11/Esoteric-Logo-300x300.jpg",
    //   companyNickname: "Esoteric Brewing Company",
    //   companyPricePerShare: 100,
    //   companyUnitPrice: 100,
    //   amount: 25000,
    //   agreementUrl: ""
    // }
  ],
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
  investments: state => state.currentUser.investments,
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
  }
};
