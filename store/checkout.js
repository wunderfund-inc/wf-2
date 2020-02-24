import firebase, { db, timestamp } from "@/plugins/firebase";
import { validMethodExtras } from "@/plugins/validators";
const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  agreementUrl: null,
  showAgreementModal: false,
  agreedTo: [],
  testimonial: null,
  selectedOffering: null,
  selectedAmount: 0,
  selectedMethod: null,
  selectedType: null,
  selectedEntity: null,
  ach: {
    account: null,
    routing: null
  },
  cc: {
    name: null,
    number: null,
    cvv: null,
    expiry: {
      month: null,
      year: null
    }
  },
  crypto: {
    address: null
  }
});

export const getters = {
  showAgreementModal: state => state.showAgreementModal,
  agreementUrl: state => state.agreementUrl,
  testimonial: state => state.testimonial,
  validAgreementList: state => state.agreedTo.length === 5,
  agreedTo: state => state.agreedTo,
  selectedOffering: state => state.selectedOffering,
  selectedAmount: state => state.selectedAmount,
  selectedMethod: state => state.selectedMethod,
  selectedType: state => state.selectedType,
  selectedEntity: state => state.selectedEntity,
  ach: state => state.ach,
  cc: state => state.cc,
  ccExpiry: state => state.cc.expiry,
  ccExpiration: state => state.cc.expiry.month + "/" + state.cc.expiry.year,
  cryptoAddress: state => state.crypto.address,
  validMethod: state => {
    const validTransactionMethod =
      state.selectedMethod && state.selectedMethod.length > 0;
    const validExtras = validMethodExtras(state);

    return validTransactionMethod && validExtras;
  }
};

export const mutations = {
  SET_AGREEMENT_URL: (state, payload) => (state.agreementUrl = payload),
  SHOW_AGREEMENT_MODAL: (state, payload) => {
    state.showAgreementModal = payload;
  },
  SET_TESTIMONIAL: (state, payload) => (state.testimonial = payload),
  SET_AGREEMENTS: (state, payload) => (state.agreedTo = payload),
  SET_OFFERING: (state, payload) => (state.selectedOffering = payload),
  SET_TRANSACTION_AMOUNT: (state, payload) => (state.selectedAmount = payload),
  SET_PAYMENT_METHOD: (state, payload) => (state.selectedMethod = payload),
  SET_TRANSACTION_TYPE: (state, payload) => (state.selectedType = payload),
  SET_ENTITY: (state, payload) => (state.selectedEntity = payload),
  SET_ACH_ATTRIBUTE: (state, payload) => {
    state.ach = Object.assign(cloneDeep(state.ach), payload);
  },
  SET_CC_ATTRIBUTE: (state, payload) => {
    state.cc = Object.assign(cloneDeep(state.cc), payload);
  },
  SET_CC_EXPIRY_ATTRIBUTE: (state, payload) => {
    state.cc.expiry = Object.assign(cloneDeep(state.cc.expiry), payload);
  },
  SET_CRYPTO_ADDRESS: (state, payload) => (state.crypto.address = payload)
};

export const actions = {
  setAgreementUrl({ commit }, payload) {
    commit("SET_AGREEMENT_URL", payload);
  },
  showAgreementModal({ commit }, payload) {
    commit("SHOW_AGREEMENT_MODAL", payload);
  },
  setAgreements({ commit }, payload) {
    commit("SET_AGREEMENTS", payload);
  },
  setOffering({ commit }, payload) {
    commit("SET_OFFERING", payload);
  },
  async submitInvestment(
    { state, dispatch },
    { companyId, offeringId, userId }
  ) {
    try {
      const investmentRef = await db.collection("investments").doc();

      const dto = {
        uid: investmentRef.id,
        type: state.selectedType,
        method: state.selectedMethod,
        amount: state.selectedAmount,
        agreements: state.agreedTo,
        createdAt: timestamp,
        updatedAt: timestamp,
        companyId,
        offeringId,
        userId
      };

      const key = state.selectedMethod.toLowerCase();
      dto.extras = Object.assign(cloneDeep({ [key]: state[key] }));
      await investmentRef.set(dto);

      const apiEndpt =
        "https://us-central1-wunderfund-server.cloudfunctions.net/agreementOnRequest";
      const url = await this.$axios.$post(apiEndpt, { ...dto });
      await dispatch("setAgreementUrl", url);
      // await dispatch("showAgreementModal", true);

      // Send testimonial to company
      if (state.testimonial) {
        const userRef = await db
          .collection("users")
          .doc(userId)
          .get();
        const user = userRef.data();

        await db
          .collection("companies")
          .doc(companyId)
          .update({
            testimonials: firebase.firestore.FieldValue.arrayUnion({
              userId: user.uid,
              testimonial: state.testimonial,
              displayed: false
            })
          });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
