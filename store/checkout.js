import firebase, { db, timestamp } from "@/plugins/firebase";
import { validMethodExtras } from "@/plugins/validators";
const cloneDeep = require("lodash.clonedeep");

export const state = () => ({
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
  setAgreements({ commit }, payload) {
    commit("SET_AGREEMENTS", payload);
  },
  setOffering({ commit }, payload) {
    commit("SET_OFFERING", payload);
  },
  async submitInvestment(context, { companyId, offeringId, userId }) {
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

      switch (state.selectedMethod) {
        case "ACH":
          dto.extras = Object.assign(cloneDeep({ ach: state.ach }));
          break;
        case "CC":
          dto.extras = Object.assign(cloneDeep({ cc: state.cc }));
          break;
        case "CRYPTO":
          dto.extras = Object.assign(cloneDeep({ crypto: state.crypto }));
          break;
      }

      await investmentRef.set(dto);

      if (state.testimonial) {
        const userRef = await db
          .collection("users")
          .doc(userId)
          .get();
        const user = userRef.data();
        const nameFormatted = `${user.name.first} ${user.name.last.charAt(0)}`;

        await db
          .collection("offerings")
          .doc(offeringId)
          .update({
            testimonials: firebase.firestore.FieldValue.arrayUnion({
              photoUrl: "",
              name: nameFormatted,
              testimonial: state.testimonial
            })
          });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
