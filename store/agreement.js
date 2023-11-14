import { db, timestamp } from "@/plugins/firebase";
// eslint-disable-next-line
import {
  validAchAccountNumber,
  validAchRoutingNumber,
  validAttestations,
  validCreditCard,
  validEthereumAddress,
} from "../helpers/validators";

export const state = () => ({
  offering: null,
  amountType: null,
  amount: null,
  method: null,
  account: null, // ACH input
  routing: null, // ACH input
  name: null, // Credit Card input
  number: null, // Credit Card input
  expiryMonth: null, // Credit Card input
  expiryYear: null, // Credit Card input
  cvv: null, // Credit Card input
  address: null, // Cryptocurrency input
  attestation1: false,
  attestation2: false,
  attestation3: false,
  attestation4: false,
  attestation5: false,
  testimonial: null,
  url: null,
  editingProfile: false,
  entityName: null,
  entityType: null,
  entityEin: null,
  investmentId: null,
  submitting: false,
});

export const getters = {
  validAmount(state) {
    if (!state.offering || !state.amount) return false;

    if (state.method === "CC" && state.amount > 4999) return false;

    if (["Equity", "Convertible Note"].includes(state.offering.security_type)) {
      const { method, amount, offering } = state;

      if (method === "CC" && amount * offering.price_per_share > 4999) {
        return false;
      }

      return state.amount >= state.offering.securities_min;
    } else {
      return state.amount >= state.offering.minimum_investment_amount;
    }
  },
  validMethod(state) {
    switch (state.method) {
      case "ACH":
        return (
          validAchAccountNumber(state.account) &&
          validAchRoutingNumber(state.routing)
        );
      case "CC":
        return validCreditCard({
          name: state.name,
          number: state.number,
          month: state.expiryMonth,
          year: state.expiryYear,
          cvv: state.cvv,
        });
      case "CRYPTO":
        return validEthereumAddress(state.address);
      case "CHECK":
      case "WIRE":
        return true;
      default:
        return false;
    }
  },
  validAttestations(state) {
    return validAttestations([
      state.attestation1,
      state.attestation2,
      state.attestation3,
      state.attestation4,
      state.attestation5,
    ]);
  },
};

export const mutations = {
  SET_AGREEMENT_ATTRIBUTE: (state, { prop, val }) => (state[prop] = val),
};

export const actions = {
  setAttribute({ commit }, { prop, val }) {
    commit("SET_AGREEMENT_ATTRIBUTE", { prop, val });
  },
  async saveToFirebase(
    { state, commit },
    { accredited, auth, companyId, companyName }
  ) {
    const userRef = db.collection("users").doc(auth.userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const invRef = db.collection("investments").doc();
    const investmentData = {
      campaign_id: companyId, // `wunderfund` or `spikes-beer-ice`
      company_name: companyName.toUpperCase(), // `WUNDERFUND`
      date_created: timestamp,
      date_updated: timestamp,
      investment_type: userData.is_entity ? "ENTITY" : "PERSONAL",
      investment_agreement_id: null,
      investment_amount_type: state.amountType, // `RAW` or `SHARES`
      investment_amount: state.amount,
      investment_method: state.method, // `ACH`, `CC`, `CHECK`, `WIRE`, `CRYPTO`
      investment_attestations: [
        state.attestation1,
        state.attestation2,
        state.attestation3,
        state.attestation4,
        state.attestation5,
      ],
      offering_details: state.offering, // typeof {}
      offering_id: state.offering.offering_data.id,
      tapi_offering_id: state.offering.transact_api_offering_id,
      tapi_trade_id: null,
      uid: invRef.id,
      user_accredited: accredited,
      user_testimonial: state.testimonial, // typeof string[]
      user_id: auth.userId,
      user_email: auth.email,
      user_first_name: userData.first_name,
      user_last_name: userData.last_name,
      user_avatar: userData.avatar || null,
      user_tapi_account_id: userData.transact_api_account_id,
    };

    if (state.method === "ACH") {
      investmentData.method_details = {
        ach_account: state.account,
        ach_routing: state.routing,
      };
    } else if (state.method === "CC") {
      investmentData.method_details = {
        cc_name: state.name,
        cc_number: state.number,
        cc_expiry_month: state.expiryMonth,
        cc_expiry_year: state.expiryYear,
        cc_cvv: state.cvv,
      };
    } else if (state.method === "CRYPTO") {
      investmentData.method_details = {
        crypto_address: state.address,
      };
    }

    try {
      const investmentId = invRef.id;

      await commit("SET_AGREEMENT_ATTRIBUTE", {
        prop: "investmentId",
        val: investmentId,
      });

      await invRef.set(investmentData);
    } catch (error) {
      throw new Error(error);
    }
  },
  async fetchURL({ state, commit }, { auth }) {
    const domain = "https://us-central1-wunderfund-server.cloudfunctions.net";
    const endpoint = "agreementOnRequest";

    const payload = {
      offering_details: state.offering,
      user_id: auth.userId,
      investment_amount: state.amount,
      investment_id: state.investmentId,
    };

    try {
      const url = await this.$axios.$post(`${domain}/${endpoint}`, payload);

      await commit("SET_AGREEMENT_ATTRIBUTE", {
        prop: "url",
        val: url,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
  showOverlay({ commit }, payload) {
    commit("SET_AGREEMENT_ATTRIBUTE", { prop: "submitting", val: payload });
  },
};
