import { db } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  companies: [],
  offerings: []
});

export const getters = {
  company: state => state.company,
  companies: state => state.companies,
  offerings: state => state.offerings
};

export const mutations = {
  SET_COMPANY: (state, payload) => (state.company = payload),
  SET_COMPANIES: (state, payload) => (state.companies = payload),
  SET_OFFERINGS: (state, payload) => (state.offerings = payload)
};

export const actions = {
  async fetchOfferings({ state, commit }, companyId) {
    try {
      const activeOfferings = await db
        .collection("offerings")
        .where("companyId", "==", companyId)
        .where("published", "==", true)
        .where("platforms", "array-contains", "WFP")
        .get();

      const offerings = await Promise.all(
        activeOfferings.docs.map(offeringRef => offeringRef.data())
      );
      const sortedOfferings = offerings.sort((a, b) => {
        return a.goal.min - b.goal.min;
      });

      await commit("SET_OFFERINGS", sortedOfferings);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async fetchCompany({ commit, dispatch }, id) {
    try {
      const companyDocument = await db
        .collection("companies")
        .doc(id)
        .get();
      const company = companyDocument.data();

      await dispatch("fetchOfferings", company.uid);
      await commit("SET_COMPANY", company);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async fetchCompanies({ commit }) {
    try {
      const querySnapshot = await db.collection("companies").get();
      const listOfCompanies = await Promise.all(
        querySnapshot.docs.map(async company => {
          const companyData = company.data();
          const activeOfferings = await db
            .collection("offerings")
            .where("companyId", "==", companyData.uid)
            .where("published", "==", true)
            .where("platforms", "array-contains", "WFP")
            .orderBy("createdAt")
            .get();

          companyData.offerings = activeOfferings.docs.map(offering =>
            offering.data()
          );

          return companyData;
        })
      );

      await commit("SET_COMPANIES", listOfCompanies);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
