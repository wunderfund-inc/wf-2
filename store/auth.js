import Cookies from "js-cookie";
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
} from "@/plugins/firebase";

export const state = () => ({
  email: null,
  emailVerified: false,
  userId: null,
});

export const mutations = {
  MUTATE: (state, payload) => (state[payload.prop] = payload.val),
};

export const actions = {
  async signInWithSocialMedia({ dispatch }, brand) {
    try {
      let provider;

      switch (brand) {
        case "facebook":
          provider = facebookAuthProvider;
          break;
        case "google":
          provider = googleAuthProvider;
          break;
      }

      const user = await auth.signInWithPopup(provider);
      const userData = user.user.toJSON();
      await dispatch("login", userData);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async loginUser({ dispatch }, { email, password }) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      if (user.user.emailVerified) {
        const userData = user.user.toJSON();
        await dispatch("login", userData);
      } else {
        await dispatch("logout");
        throw new Error("Email not verified");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async login({ dispatch }, user) {
    try {
      const token = await auth.currentUser.getIdToken(true);
      Cookies.set("access_token", token, { expires: 1 });
      await dispatch("set", {
        email: user.email,
        emailVerified: user.emailVerified,
        userId: user.uid,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async logout({ dispatch }) {
    try {
      await auth.signOut();
      Cookies.remove("access_token");
      await dispatch("unset");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updatePassword(context, password) {
    try {
      await auth.currentUser.updatePassword(password);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async sendPasswordResetEmail(context, email) {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  },
  set({ commit }, { email, emailVerified, userId }) {
    commit("MUTATE", { prop: "email", val: email });
    commit("MUTATE", { prop: "emailVerified", val: emailVerified });
    commit("MUTATE", { prop: "userId", val: userId });
  },
  unset({ commit }) {
    commit("MUTATE", { prop: "email", val: null });
    commit("MUTATE", { prop: "emailVerified", val: null });
    commit("MUTATE", { prop: "userId", val: null });
  },
};
