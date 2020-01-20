import firebase, { db, timestamp } from "@/plugins/firebase";
import { validMethodExtras } from "@/plugins/validators";
const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
  agreedTo: [],
  selectedOffering: null,
  transactionAmount: null,
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
  validAgreementList: state => state.agreedTo.length === 5,
  agreedTo: state => state.agreedTo,
  selectedOffering: state => state.selectedOffering,
  transactionAmount: state => state.transactionAmount,
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
  SET_AGREEMENTS: (state, payload) => (state.agreedTo = payload),
  SET_OFFERING: (state, payload) => (state.selectedOffering = payload),
  SET_TRANSACTION_AMOUNT: (state, payload) =>
    (state.transactionAmount = payload),
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
  setAgreements({ commit }, payload) {
    commit("SET_AGREEMENTS", payload);
  },
  setOffering({ commit }, payload) {
    commit("SET_OFFERING", payload);
  },
  async submitInvestment({ state }, { companyId, userId }) {
    const investment = await db.collection("investments").doc();

    const data = {
      userId,
      companyId,
      offeringId: state.selectedOffering.uid,
      type: state.selectedType,
      method: state.selectedMethod,
      amount: state.transactionAmount,
      agreements: state.agreedTo,
      uid: investment.id
    };

    if (state.selectedEntity) data.entity = state.selectedEntity;

    switch (state.selectedMethod) {
      case "ACH":
        data.extras = Object.assign(cloneDeep({ ach: state.ach }));
        break;
      case "CC":
        data.extras = Object.assign(cloneDeep({ cc: state.cc }));
        break;
      case "CRYPTO":
        data.extras = Object.assign(cloneDeep({ crypto: state.crypto }));
        break;
    }

    await investment.set({
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    });

    const userDoc = await db.collection("users").doc(userId);
    await userDoc.update({
      investments: firebase.firestore.FieldValue.arrayUnion(investment.id),
      updatedAt: timestamp
    });

    if (state.selectedEntity) {
      const entityDoc = await db
        .collection("entities")
        .doc(state.selectedEntity.uid);
      await entityDoc.update({
        investments: firebase.firestore.FieldValue.arrayUnion(investment.id),
        updatedAt: timestamp
      });
    }

    const companyDoc = await db.collection("companies").doc(companyId);
    await companyDoc.update({
      investments: firebase.firestore.FieldValue.arrayUnion(investment.id),
      updatedAt: timestamp
    });

    const offeringDoc = await db
      .collection("offerings")
      .doc(state.selectedOffering.uid);
    await offeringDoc.update({
      investments: firebase.firestore.FieldValue.arrayUnion(investment.id),
      updatedAt: timestamp
    });
  }
};
