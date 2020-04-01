import { db, timestamp } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  comments: [],
  companies: [],
  offerings: []
});

export const getters = {
  company: state => state.company,
  comments: state => state.comments,
  companies: state => state.companies,
  offerings: state => state.offerings
};

export const mutations = {
  SET_COMPANY: (state, payload) => (state.company = payload),
  SET_COMMENTS: (state, payload) => (state.comments = payload),
  SET_COMPANIES: (state, payload) => (state.companies = payload),
  SET_OFFERINGS: (state, payload) => (state.offerings = payload)
};

export const actions = {
  async fetchOfferings({ commit }, companyId) {
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
      throw Error(error.message);
    }
  },
  async fetchCompany({ commit, dispatch }, id) {
    try {
      const companyDocument = await db
        .collection("companies")
        .doc(id)
        .get();
      const company = companyDocument.data();

      await dispatch("fetchOfferings", id);
      await dispatch("fetchComments", id);
      await commit("SET_COMPANY", company);
    } catch (error) {
      throw Error(error.message);
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
      throw Error(error.message);
    }
  },
  async fetchComments({ commit }, id) {
    try {
      const commentDocs = await db
        .collection(`companies/${id}/comments`)
        .orderBy("createdAt", "desc")
        .get();

      const comments = commentDocs.docs.map(comment => comment.data());

      await commit("SET_COMMENTS", comments);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async submitComment({ state, rootState }, { message, role }) {
    try {
      const dto = {
        message,
        role,
        name: {
          first: rootState.user.currentUser.name.first,
          last: rootState.user.currentUser.name.last
        },
        userId: rootState.user.currentUser.uid,
        avatar: rootState.user.currentUser.photoUrl || null,
        companyId: state.company.uid,
        approved: false,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      await db
        .collection(`companies/${state.company.uid}/comments`)
        .doc()
        .set(dto);
    } catch (error) {
      throw Error(error.message);
    }
  }
};
