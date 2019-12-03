import { auth } from "@/plugins/firebase";
import { actionCodeSettings } from "@/plugins/firebase-config";

export const actions = {
  async REGISTER_VIA_MAGIC_LINK({ commit }, email) {
    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      // eslint-disable-next-line
      console.log("Magic link sent!");
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async REGISTER_VIA_PASSWORD({ commit }, payload) {
    try {
      // eslint-disable-next-line
      console.log("Signing in via password...");
      // eslint-disable-next-line
      console.log(payload);
      await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
