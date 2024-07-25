import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { db, timestamp } from "@/plugins/firebase";
const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  agreementUrl: null,
  showAgreementModal: false,
  agreedTo: [],
  testimonial: null,
  selectedOffering: null,
  selectedAmount: 0,
  selectedShares: 0,
  selectedMethod: null,
  selectedType: null,
  selectedEntity: null,
  ach: {
    account: null,
    routing: null,
  },
  cc: {
    name: null,
    number: null,
    cvv: null,
    expiry: {
      month: null,
      year: null,
    },
  },
  crypto: {
    address: null,
  },
});

export const getters = {
  showAgreementModal: (state) => state.showAgreementModal,
  agreementUrl: (state) => state.agreementUrl,
  testimonial: (state) => state.testimonial,
  validAgreementList: (state) => state.agreedTo.length === 5,
  agreedTo: (state) => state.agreedTo,
  selectedOffering: (state) => state.selectedOffering,
  selectedAmount: (state) => state.selectedAmount,
  selectedShares: (state) => state.selectedShares,
  selectedMethod: (state) => state.selectedMethod,
  selectedType: (state) => state.selectedType,
  selectedEntity: (state) => state.selectedEntity,
  ach: (state) => state.ach,
  cc: (state) => state.cc,
  ccExpiry: (state) => state.cc.expiry,
  ccExpiration: (state) => state.cc.expiry.month + "/" + state.cc.expiry.year,
  cryptoAddress: (state) => state.crypto.address,
  validMethod: (state) => {
    const validTransactionMethod =
      state.selectedMethod && state.selectedMethod.length > 0;
    // const validExtras = validMethodExtras(state);
    const validExtras = true;

    return validTransactionMethod && validExtras;
  },
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
  SET_TRANSACTION_SHARES: (state, payload) => (state.selectedShares = payload),
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
  SET_CRYPTO_ADDRESS: (state, payload) => (state.crypto.address = payload),
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
    { companyId, offeringId, userId, entityId }
  ) {
    try {
      const selectedShares = ["Equity", "Convertible Note"].includes(
        state.selectedOffering.securityType
      )
        ? state.selectedOffering.equity.pricePerShare * state.selectedShares
        : null;
      const investmentRef = doc(collection(db, "investments"));
      const dto = {
        createdAt: timestamp,
        updatedAt: timestamp,
        documentId: null,
        uid: investmentRef.id,
        type: state.selectedType,
        method: state.selectedMethod,
        amount: state.selectedAmount,
        shares: selectedShares,
        agreements: state.agreedTo,
        companyId,
        offeringId,
        userId,
        entityId,
      };
      const key = state.selectedMethod.toLowerCase();
      dto.extras = Object.assign(cloneDeep({ [key]: state[key] }));
      await setDoc(investmentRef, dto);
      await dispatch("getSigningLink", dto);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getSigningLink({ dispatch }, dto) {
    try {
      const apiEndpt =
        "https://us-central1-wunderfund-server.cloudfunctions.net/agreementOnRequest";
      const url = await this.$axios.$post(apiEndpt, dto);
      await dispatch("setAgreementUrl", url);
      // await dispatch("showAgreementModal", true);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async submitTestimonialForReview(
    { state },
    { companyId, userId, name, avatar }
  ) {
    const testimonialRef = doc(collection(db, "testimonials"));
    const payload = {
      companyId,
      userId,
      name,
      avatar,
      testimonial: state.testimonial,
      approved: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    try {
      await addDoc(testimonialRef, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
