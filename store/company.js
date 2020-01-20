import { db } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  companies: []
});

// use getters for filters, like:
// - "companies actively fundraising"
// - "companies browsed for, based on search filter"
export const getters = {
  company: state => state.company,
  companies: state => state.companies,
  offerings: state => state.company.offerings
};

export const mutations = {
  SET_COMPANY(state, payload) {
    state.company = payload;
  },
  SET_COMPANIES(state, payload) {
    state.companies = payload;
  }
};

export const actions = {
  async fetchCompany({ commit }, id) {
    try {
      const document = await db
        .collection("companies")
        .doc(id)
        .get();

      await commit("SET_COMPANY", document.data());
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
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
