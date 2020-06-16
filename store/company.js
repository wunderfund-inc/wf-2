import { db, timestamp } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  comments: [],
  companies: [],
  offerings: [],
  testimonials: []
});

export const getters = {
  company: state => state.company,
  comments: state => state.comments,
  companies: state => state.companies,
  offerings: state => state.offerings,
  testimonials: state => state.testimonials
};

export const mutations = {
  SET_COMPANY: (state, payload) => (state.company = payload),
  SET_COMMENTS: (state, payload) => (state.comments = payload),
  SET_COMPANIES: (state, payload) => (state.companies = payload),
  SET_OFFERINGS: (state, payload) => (state.offerings = payload),
  SET_TESTIMONIALS: (state, payload) => (state.testimonials = payload)
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
  async fetchCompany({ commit, dispatch }, companyId) {
    try {
      const companyDocument = await db
        .collection("companies")
        .doc(companyId)
        .get();
      const company = companyDocument.data();

      await dispatch("fetchOfferings", companyId);
      await dispatch("fetchComments", companyId);
      await dispatch("fetchTestimonials", companyId);
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
  async fetchComments({ commit }, companyId) {
    try {
      const commentDocs = await db
        .collection("comments")
        .where("companyId", "==", companyId)
        .orderBy("createdAt", "desc")
        .get();
      if (!commentDocs.empty) {
        const comments = commentDocs.docs.map(comment => comment.data());
        await commit("SET_COMMENTS", comments);
      }
    } catch (error) {
      throw Error(error.message);
    }
  },
  async submitComment({ state, rootState }, { message, role, companyId }) {
    try {
      const commentRef = await db.collection("comments").doc();
      const dto = {
        message,
        role,
        name: {
          first: rootState.profile.first_name,
          last: rootState.profile.last_name
        },
        userId: rootState.auth.userId,
        avatar: rootState.profile.avatar || null,
        companyId,
        approved: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        uid: commentRef.id
      };
      await commentRef.set(dto);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async fetchTestimonials({ commit }, companyId) {
    try {
      const testimonialDocs = await db
        .collection("testimonials")
        .where("companyId", "==", companyId)
        .get();
      const testimonials = testimonialDocs.docs.map(testimonial => {
        return testimonial.data();
      });
      await commit("SET_TESTIMONIALS", testimonials);
    } catch (error) {
      throw Error(error.message);
    }
  }
};
