import { db } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  companies: []
});

export const getters = {
  company: state => state.company,
  companies: state => state.companies,
  offerings: state => state.company.offerings,
  amountRaised: state => {
    const investments = state.company.investments;
    const listOfAmounts = investments.map(investment => investment.amount);
    return listOfAmounts.reduce((tot, num) => tot + num);
  }
};

export const mutations = {
  SET_COMPANY: (state, payload) => (state.company = payload),
  SET_COMPANIES: (state, payload) => (state.companies = payload)
};

export const actions = {
  async fetchCompany({ commit }, id) {
    try {
      const companyRef = await db
        .collection("companies")
        .doc(id)
        .get();
      const offerings = await db.collection(`companies/${id}/offerings`).get();
      const company = companyRef.data();
      // Add in Offerings data, if any
      company.offerings = offerings.docs.map(offering => offering.data());
      // Add in Investments data, if any
      company.investments = await Promise.all(
        company.investments.map(async investmentId => {
          const investment = await db
            .collection("investments")
            .doc(investmentId)
            .get();
          return investment.data();
        })
      );
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

          const offerings = await db
            .collection(`companies/${company.id}/offerings`)
            .get();
          companyData.offerings = offerings.docs.map(offering =>
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
