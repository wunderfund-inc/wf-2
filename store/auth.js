import Cookies from "js-cookie";
import {
  auth,
  db,
  timestamp,
  FacebookAuthProvider,
  GoogleAuthProvider
  // TwitterAuthProvider
} from "@/plugins/firebase";

export const state = () => ({
  currentUserAuth: null
});

export const getters = {
  currentUserAuth: state => state.currentUserAuth,
  userId: state => state.currentUserAuth.uid || state.currentUserAuth.user_id,
  email: state => state.currentUserAuth.email,
  emailVerified: state => {
    return state.currentUserAuth
      ? state.currentUserAuth.emailVerified ||
          state.currentUserAuth.email_verified
      : false;
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
      const { email, password, attestations, name } = form;
      const user = await auth.createUserWithEmailAndPassword(email, password);

      await dispatch("createUserInDb", {
        uid: user.user.uid,
        email,
        attestations,
        name
      });

      await dispatch("login", user);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async createUserInDb(
    context,
    { uid, email, attestations, name, displayName = null, avatar = null }
  ) {
    try {
      const user = {
        uid,
        email,
        attestations,
        name,
        displayName,
        avatar,
        accreditation: {
          ai: 0,
          nw: 0
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
      throw Error(error.message);
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
      if (user.additionalUserInfo.isNewUser) {
        const payload = {
          uid: userData.uid,
          email: userData.email,
          attestations: [],
          name: {
            first: null,
            last: null
          },
          displayName: userData.displayName,
          avatar: userData.photoURL
        };
        await dispatch("createUserInDb", payload);
      }
      await dispatch("login", userData);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async loginUser({ dispatch }, { email, password }) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      await dispatch("login", user.user.toJSON());
    } catch (error) {
      throw Error(error.message);
    }
  },
  async login({ dispatch }, user) {
    try {
      const token = await auth.currentUser.getIdToken(true);
      Cookies.set("access_token", token);
      await dispatch("setAuth", user);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async logout({ dispatch }) {
    try {
      await auth.signOut();
      Cookies.remove("access_token");
      await dispatch("setAuth", null);
    } catch (error) {
      throw Error(error.message);
    }
  },
  setAuth({ commit }, authData) {
    commit("SET_AUTH_DATA", authData);
  },
  async resetPassword(context, password) {
    try {
      await auth.currentUser.updatePassword(password);
      return null;
    } catch (error) {
      throw Error(error.message);
    }
  }
};
