import { getUserFromCookie } from "@/helpers";

export const state = () => ({
  showOverlay: false,
  error: null,
  socialMediaError: null,
});

export const getters = {
  showOverlay: (state) => state.showOverlay,
  error: (state) => state.error,
  socialMediaError: (state) => state.socialMediaError,
};

export const mutations = {
  TOGGLE_OVERLAY: (state, payload) => (state.showOverlay = payload),
  DISPLAY_ERROR: (state, payload) => (state.error = payload),
  DISPLAY_SOCIAL_MEDIA_ERROR: (state, payload) => {
    state.socialMediaError = payload;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req);
    if (user) {
      await dispatch("auth/set", {
        email: user.email,
        emailVerified: user.email_verified,
        userId: user.user_id,
      });
    }
  },
  toggleOverlay({ commit }, payload) {
    commit("TOGGLE_OVERLAY", payload);
  },
  displayError({ commit }, error) {
    commit("DISPLAY_ERROR", error);
  },
  displaySocialMediaError({ commit }, error) {
    commit("DISPLAY_SOCIAL_MEDIA_ERROR", error);
  },
};
