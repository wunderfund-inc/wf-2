import Cookies from "js-cookie";
import { auth, db, timestamp } from "@/plugins/firebase";

export const state = () => ({
  currentUserAuth: null
});

export const getters = {
  currentUserAuth: state => state.currentUserAuth,
  loggedIn: state => !!state.currentUserAuth,
  emailVerified: state => {
    if (state.currentUserAuth) {
      return (
        state.currentUserAuth.emailVerified ||
        state.currentUserAuth.email_verified
      );
    }
    return false;
  }
};

export const mutations = {
  SET_AUTH_DATA(state, payload) {
    state.currentUserAuth = payload;
  }
};

export const actions = {
  async createUser({ dispatch }, form) {
    try {
      const { email, password, attestations } = form;
      const user = await auth.createUserWithEmailAndPassword(email, password);

      await dispatch("createUserInDb", {
        uid: user.user.uid,
        email,
        attestations
      });

      await dispatch("login", user);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async createUserInDb(context, { uid, email, attestations }) {
    try {
      const user = {
        uid,
        email,
        attestations,
        accredited: false,
        spendPool: {
          current: 2200,
          max: 2200
        },
        name: {
          first: null,
          last: null
        },
        address: {
          street1: null,
          street2: null,
          city: null,
          state: null,
          postal: null
        },
        createdAt: timestamp,
        updatedAt: timestamp
      };

      await db
        .collection("users")
        .doc(uid)
        .set(user);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async loginUser({ dispatch }, { email, password }) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      await dispatch("login", user.user.toJSON());
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async login({ dispatch }, user) {
    try {
      const token = await auth.currentUser.getIdToken(true);
      Cookies.set("access_token", token);
      await dispatch("setAuth", user);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async logout({ dispatch }) {
    try {
      await auth.signOut();
      Cookies.remove("access_token");
      await dispatch("setAuth", null);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  setAuth({ commit }, authData) {
    commit("SET_AUTH_DATA", authData);
  }
};
