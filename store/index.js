import { getUserFromCookie } from "@/helpers";

export const state = () => ({
  showOverlay: false
});

export const getters = {
  showOverlay: state => state.showOverlay
};

export const mutations = {
  TOGGLE_OVERLAY: (state, payload) => (state.showOverlay = payload)
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
  }
};
