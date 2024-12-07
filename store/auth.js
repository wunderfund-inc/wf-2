import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
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

      const { user } = await signInWithPopup(auth, provider);
      await dispatch("login", user);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async loginUser({ dispatch }, { email, password }) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified) {
        await dispatch("login", user);
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
      const token = await getIdToken(user, true);
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
      await signOut(auth);
      Cookies.remove("access_token");
      await dispatch("unset");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updatePassword(_, user, password) {
    try {
      await updatePassword(user, password);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async sendPasswordResetEmail(_, email) {
    try {
      await sendPasswordResetEmail(auth, email);
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
