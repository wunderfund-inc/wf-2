import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { oneYearPassed } from "@/helpers/validators";
import { db } from "@/plugins/firebase";

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
    const colRef = collection(db, "investments");
    const q = query(colRef, where("user_id", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await commit("SET_INVESTMENTS", []);
    } else {
      const investments = snapshot.docs
        .map((investment) => {
          const data = investment.data();
          const {
            uid,
            company_name: cn,
            date_created: dc,
            investment_agreement_id: iaid,
            investment_amount: ia,
            investment_amount_type: iat,
            investment_method: im,
            tapi_trade_id: ttId,
            offering_details: od,
          } = data;
          return {
            agreementId: iaid,
            uid,
            companyName: cn,
            purchaseDate: dc,
            amount: ia,
            type: iat,
            method: im,
            tradeId: ttId,
            pricePerShare: od
              ? od.price_per_share
                ? od.price_per_share
                : 1
              : 1,
          };
        })
        .filter((n) => n);
      await commit("SET_INVESTMENTS", investments);
    }
  },
};
