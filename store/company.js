import { db } from "@/plugins/firebase";

export const state = () => ({
  companies: []
});

// use getters for filters, like:
// - "companies actively fundraising"
// - "companies browsed for, based on search filter"
export const getters = {
  companies: state => state.companies
};

export const mutations = {
  SET_COMPANIES(state, payload) {
    state.companies = payload;
  }
};

export const actions = {
  async fetchCompanies({ commit }) {
    try {
      const querySnapshot = await db.collection("companies").get();
      const listOfCompanies = querySnapshot.docs.map(doc => doc.data());
      await commit("SET_COMPANIES", listOfCompanies);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
