import { db } from "@/plugins/firebase";
import { oneYearPassed } from "@/helpers/validators";

export const state = () => ({
  investments: []
});

export const getters = {
  spent(state) {
    if (state.investments.length > 0) {
      const investments = state.investments.filter(investment => {
        return !oneYearPassed(investment.purchaseDate.seconds);
      });

      if (investments.length > 0) {
        return investments
          .map(investment => investment.amount)
          .reduce((a, b) => a + b);
      }
    }
    return 0;
  }
};

export const mutations = {
  SET_INVESTMENTS: (state, payload) => (state.investments = payload)
};

export const actions = {
  async fetch({ commit }, userId) {
    const docRefs = await db
      .collection("investments")
      .where("user_id", "==", userId)
      .get();

    if (docRefs.empty) {
      await commit("SET_INVESTMENTS", []);
    } else {
      const investments = docRefs.docs.map(investments => {
        const data = investments.data();

        const {
          uid,
          company_name: cn,
          date_created: dc,
          document_url: du,
          investment_amount: ia,
          investment_amount_type: iat,
          investment_method: im,
          investment_agreement_id: iai
        } = data;

        return {
          uid,
          companyName: cn,
          purchaseDate: dc,
          amount: ia,
          type: iat,
          method: im,
          agreementId: iai,
          documentUrl: du
        };
      });

      await commit("SET_INVESTMENTS", investments);
    }
  }
};
