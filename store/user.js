const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  passwordOld: null,
  passwordNew: null,
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
      uid: null,
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
  entityAddress: state => state.form.entity.address,
  personal: state => state.personal,
  passwordOld: state => state.passwordOld,
  passwordNew: state => state.passwordNew,
  passwordsMatch: state => {
    return state.passwordOld === state.passwordNew;
  },
  entities: state => state.entities,
  hasEntities: state => state.entities.length > 0,
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
    state.form.entity = Object.assign(cloneDeep(state.form.entity), payload);
  },
  SET_ENTITY_ADDRESS_ATTRIBUTE(state, payload) {
    state.form.entity.address = Object.assign(
      cloneDeep(state.form.entity.address),
      payload
    );
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
  SET_CURRENT_USER_PROFILE(state, payload) {
    state.currentUser.profile = payload;
  },
  SET_CURRENT_USER(state, payload) {
    state.currentUser = payload;
  }
};

export const actions = {
  setCurrentUser({ commit }, payload) {
    commit("SET_CURRENT_USER", payload);
  },
  setCurrentUserProfile({ commit }, payload) {
    commit("SET_CURRENT_USER_PROFILE", payload);
  }
};
