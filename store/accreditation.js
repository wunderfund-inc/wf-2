import { db, timestamp } from "@/plugins/firebase";

export const state = () => ({
  ai: 0,
  nw: 0,
});

export const mutations = {
  SET_ACCREDITATION_ATTRIBUTE: (state, { prop, val }) => (state[prop] = val),
};

export const actions = {
  setAttribute({ commit }, { prop, val }) {
    commit("SET_ACCREDITATION_ATTRIBUTE", { prop, val });
  },
  async update({ state }, userId) {
    try {
      await db.collection("users").doc(userId).update({
        accreditation_ai: state.ai,
        accreditation_nw: state.nw,
        date_updated: timestamp,
        flag: "update:accreditation",
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
