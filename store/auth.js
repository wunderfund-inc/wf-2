import Cookies from "js-cookie";
import {
  auth,
  verifyEmail,
  FacebookAuthProvider,
  GoogleAuthProvider
  // TwitterAuthProvider
} from "@/plugins/firebase";

export const state = () => ({
  email: null,
  emailVerified: false,
  userId: null
});

export const mutations = {
  MUTATE: (state, payload) => (state[payload.prop] = payload.val)
};

export const actions = {
  async createUser({ dispatch }, { email, password }) {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      await verifyEmail();
      await dispatch("logout");
    } catch (error) {
      throw Error(error);
    }
  },
  async signInWithSocialMedia({ dispatch }, brand) {
    try {
      let provider;

      if (brand === "facebook") {
        provider = FacebookAuthProvider;
      } else if (brand === "google") {
        provider = GoogleAuthProvider;
      }
      // else {
      //   provider = TwitterAuthProvider;
      // }

      const user = await auth.signInWithPopup(provider);
      const userData = user.user.toJSON();
      await dispatch("login", userData);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async loginUser({ dispatch }, form) {
    try {
      const { email, password } = form;
      const user = await auth.signInWithEmailAndPassword(email, password);
      const userData = user.user.toJSON();
      await dispatch("login", userData);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async login({ dispatch }, user) {
    try {
      const token = await auth.currentUser.getIdToken(true);
      Cookies.set("access_token", token);
      await dispatch("set", {
        email: user.email,
        emailVerified: user.emailVerified,
        userId: user.uid
      });
    } catch (error) {
      throw Error(error.message);
    }
  },
  async logout({ dispatch }) {
    try {
      await auth.signOut();
      Cookies.remove("access_token");
      await dispatch("unset");
    } catch (error) {
      throw Error(error.message);
    }
  },
  async updatePassword(context, password) {
    try {
      await auth.currentUser.updatePassword(password);
    } catch (error) {
      throw Error(error.message);
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
  }
};
