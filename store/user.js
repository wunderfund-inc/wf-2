import { auth, db, timestamp } from "@/plugins/firebase";
const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  entities: [],
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
  entities: state => state.entities,
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
  async setAccountData({ dispatch }) {
    const userId = auth.currentUser.uid || auth.currentUser.user_id;

    const user = await db
      .collection("users")
      .doc(userId)
      .get();

    const userData = user.data();

    await dispatch("setCurrentUser", userData);
    await dispatch("setProfileNameAttribute", { ...userData.name });
    await dispatch("setProfileAddressAttribute", { ...userData.address });

    // const investments = await Promise.all(
    //   userData.investments.map(async id => {
    //     try {
    //       const investmentRef = await db
    //         .collection("investments")
    //         .doc(id)
    //         .get();

    //       return investmentRef.data();
    //     } catch (error) {
    //       // eslint-disable-next-line
    //       console.error(error);
    //     }
    //   })
    // );

    const entitiesList = await db.collection(`users/${userId}/entities`).get();
    const entities = entitiesList.docs.map(entity => entity.data());

    await dispatch("setEntities", entities);

    const investments = [];
    await dispatch("setInvestments", investments);
  },
  async createEntity(context, { entityData, currentUserAuth }) {
    const entityRef = await db.collection("entities").doc();
    const userId = currentUserAuth.uid || currentUserAuth.user_id;
    const userEntity = await db.collection(`users/${userId}/entities`).doc();

    const dto = {
      uid: entityRef.id,
      ...entityData,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await entityRef.set(dto);
    await userEntity.set(dto);
  },
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
  setEntities({ commit }, entities) {
    commit("SET_ENTITY_LIST", entities);
  },
  async setInvestments({ commit }, investments) {
    const d = await Promise.all(
      investments.map(async investment => {
        const companyRef = await db
          .collection("companies")
          .doc(investment.companyId)
          .get();
        const offeringRef = await db
          .collection("offerings")
          .doc(investment.offeringId)
          .get();
        return {
          ...investment,
          company: companyRef.data(),
          offering: offeringRef.data()
        };
      })
    );
    commit("SET_INVESTMENTS", d);
  }
};
