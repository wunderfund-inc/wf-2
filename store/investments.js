import { db } from "@/plugins/firebase";
import { oneYearPassed } from "@/helpers/validators";

export const state = () => ({
  investments: [],
});

export const getters = {
  spent(state) {
    if (state.investments.length > 0) {
      const investments = state.investments.filter((investment) => {
        return !oneYearPassed(investment.purchaseDate.seconds);
      });

      if (investments.length > 0) {
        return investments
          .map((investment) => {
            if (investment.type === "SHARES") {
              return investment.amount * investment.pricePerShare;
            }
            return investment.amount;
          })
          .reduce((a, b) => a + b);
      }
    }
    return 0;
  },
};

export const mutations = {
  SET_INVESTMENTS: (state, payload) => (state.investments = payload),
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
      const investments = docRefs.docs
        .map((investment) => {
          const data = investment.data();
          if (data.investment_agreement_id) {
            const {
              uid,
              company_name: cn,
              date_created: dc,
              investment_amount: ia,
              investment_amount_type: iat,
              investment_method: im,
              investment_agreement_id: iai,
              tapi_trade_id: ttId,
              offering_details: offeringDetails,
            } = data;

            const pricePerShare =
              offeringDetails.security_type === "Equity"
                ? offeringDetails.price_per_share
                : 0;

            return {
              uid,
              companyName: cn,
              purchaseDate: dc,
              amount: ia,
              type: iat,
              method: im,
              agreementId: iai,
              tradeId: ttId,
              pricePerShare,
            };
          }
        })
        .filter((n) => n);
      await commit("SET_INVESTMENTS", investments);
    }
  },
};
