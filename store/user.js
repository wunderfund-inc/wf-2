import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db, timestamp, uploadImage } from "@/plugins/firebase";
import { calculatePersonalLimit } from "@/helpers/finance";
import { reduceToTotal } from "@/helpers/filters";
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
      accreditation: {
        ai: 0,
        nw: 0,
      },
      nonSpecific: false,
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null,
      },
    },
    password: {
      old: null,
      new: null,
    },
    profile: {
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null,
      },
      name: {
        first: null,
        last: null,
      },
      avatar: null,
    },
  },
});

export const getters = {
  accreditation: (state) => state.currentUser.accreditation,
  accredited: (state, getters) => {
    const { ai, nw } = getters.accreditation;
    return ai >= 200000 && nw >= 1000000;
  },
  entityForm: (state) => state.form.entity,
  entityAddress: (state) => state.form.entity.address,
  password: (state) => state.form.password,
  address: (state) => state.form.profile.address,
  avatar: (state) => state.form.profile.avatar,
  name: (state) => state.form.profile.name,
  validProfileForm: (state) => {
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
  passwordsMatch: (state) => {
    const password = state.form.password;
    return password.old === password.new;
  },
  entities: (state) => state.entities,
  hasEntities: (state) => state.entities.length > 0,
  investments: (state) => state.investments,
  currentUser: (state) => state.currentUser,
  userId: (state) => state.currentUser.uid,
  spendPool: (state, getters) => {
    const spent = reduceToTotal(getters.investments);
    const { ai, nw } = getters.accreditation;
    return {
      current: calculatePersonalLimit(ai, nw) - spent,
      max: calculatePersonalLimit(ai, nw),
    };
  },
  entitySelection: (state) => {
    const entityList = state.entities;
    return entityList.map((el) => {
      return { value: el, text: el.name };
    });
  },
  getEntityById: (state) => (uid) => {
    if (uid) return state.entities.find((entity) => entity.uid === uid);
    return null;
  },
};

export const mutations = {
  SET_ENTITY_ACCREDITATION(state, payload) {
    const accreditation = state.form.entity.accreditation;
    state.form.entity.accreditation = Object.assign(
      cloneDeep(accreditation),
      payload
    );
  },
  SET_ACCREDITATION_ATTRIBUTE(state, payload) {
    const accreditation = state.currentUser.accreditation;
    state.currentUser.accreditation = Object.assign(
      cloneDeep(accreditation),
      payload
    );
  },
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
  SET_PROFILE_AVATAR: (state, payload) => (state.form.profile.avatar = payload),
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
  },
};

export const actions = {
  setEntityAccreditation({ commit }, payload) {
    commit("SET_ENTITY_ACCREDITATION", payload);
  },
  async setAccountData({ dispatch }, userId) {
    try {
      if (userId) {
        const userProfileRef = doc(db, `users/${userId}`);
        const userSnapshot = await getDoc(userProfileRef);
        const userData = userSnapshot.data();

        await dispatch("setCurrentUser", userData);
        await dispatch("setProfileNameAttribute", { ...userData.name });
        await dispatch("setProfileAddressAttribute", { ...userData.address });
        await dispatch("setProfileAvatar", userData.avatar);

        const entitiesColRef = collection(db, "entities");
        const q = query(entitiesColRef, where("userId", "==", userId));
        const entitiesList = await getDocs(q);
        const entities = entitiesList.docs.map((e) => e.data());

        await dispatch("setEntities", entities);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async createEntity(context, { entityData, currentUserAuth }) {
    try {
      const docRef = doc(collection(db, "entities"));
      const userId = currentUserAuth.uid || currentUserAuth.user_id;
      const dto = {
        uid: docRef.id,
        userId,
        ...entityData,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await addDoc(docRef, dto);
    } catch (error) {
      throw new Error(error.message);
    }
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
  setProfileAvatar({ commit }, payload) {
    commit("SET_PROFILE_AVATAR", payload);
  },
  setCurrentUser: ({ commit }, payload) => {
    commit("SET_CURRENT_USER", payload);
  },
  setCurrentUserProfile({ commit }, payload) {
    commit("SET_CURRENT_USER_PROFILE", payload);
  },
  setEntities({ commit }, entities) {
    commit("SET_ENTITY_LIST", entities);
  },
  async updateProfileData({ state }) {
    try {
      const userId = state.currentUser.uid || state.currentUser.user_id;
      const profile = state.form.profile;
      const docRef = doc(db, `users/${userId}`);
      const dto = {
        name: profile.name,
        address: profile.address,
        updatedAt: timestamp,
      };
      await updateDoc(docRef, dto);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async setInvestments({ commit }, investments) {
    const actions = investments.map(async (investment) => {
      const companyDocRef = doc(db, `companies/${investment.companyId}`);
      const companyDocSnap = await getDoc(companyDocRef);

      const offeringDocRef = doc(db, `offerings/${investment.offeringId}`);
      const offeringDocSnap = await getDoc(offeringDocRef);

      return {
        ...investment,
        company: companyDocSnap.data(),
        offering: offeringDocSnap.data(),
      };
    });
    const d = await Promise.all(actions);

    commit("SET_INVESTMENTS", d);
  },
  clearEntityForm({ commit }) {
    const entity = {
      name: null,
      classification: null,
      ein: null,
      differentEmail: false,
      email: null,
      accredited: false,
      ai: null,
      nw: null,
      nonSpecific: false,
      address: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null,
      },
    };
    commit("SET_ENTITY_FORM_ATTRIBUTE", entity);
  },
  async uploadAvatar({ dispatch }, { userId, file }) {
    const docRef = doc(db, `users/${userId}`);

    try {
      const url = await uploadImage(`avatars/${userId}/${file.name}`, file);
      await updateDoc(docRef, { avatar: url });
      await dispatch("setProfileAvatar", url);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
