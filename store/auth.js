import Cookies from "js-cookie";
import { auth } from "@/plugins/firebase";

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
