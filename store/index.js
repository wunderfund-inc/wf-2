import { getUserFromCookie } from "@/helpers";

export const state = () => ({
  showOverlay: false,
  error: null
});

export const getters = {
  showOverlay: state => state.showOverlay,
  error: state => state.error
};

export const mutations = {
  TOGGLE_OVERLAY: (state, payload) => (state.showOverlay = payload),
  DISPLAY_ERROR: (state, payload) => (state.error = payload)
};

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req);
    if (user) {
      await dispatch("auth/setAuth", user);
      const userId = user.uid || user.user_id;
      await dispatch("user/setAccountData", userId);
    }
  },
  toggleOverlay({ commit }, payload) {
    commit("TOGGLE_OVERLAY", payload);
  },
  displayError({ commit }, error) {
    commit("DISPLAY_ERROR", error);
  }
};
