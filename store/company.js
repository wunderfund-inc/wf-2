import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { db, timestamp } from "@/plugins/firebase";

export const state = () => ({
  company: null,
  comments: [],
  companies: [],
  offerings: [],
  testimonials: [],
});

export const getters = {
  company: (state) => state.company,
  comments: (state) => state.comments,
  companies: (state) => state.companies,
  offerings: (state) => state.offerings,
  testimonials: (state) => state.testimonials,
};

export const mutations = {
  SET_COMPANY: (state, payload) => (state.company = payload),
  SET_COMMENTS: (state, payload) => (state.comments = payload),
  SET_COMPANIES: (state, payload) => (state.companies = payload),
  SET_OFFERINGS: (state, payload) => (state.offerings = payload),
  SET_TESTIMONIALS: (state, payload) => (state.testimonials = payload),
};

export const actions = {
  async fetchOfferings({ commit }, companyId) {
    const offeringsRef = collection(db, "offerings");
    const q = query(
      offeringsRef,
      where("companyId", "==", companyId),
      where("published", "==", true),
      where("platforms", "array-contains", "WFP")
    );

    try {
      const activeOfferings = await getDocs(q);
      const actions = activeOfferings.docs.map((o) => o.data());
      const offerings = await Promise.all(actions);
      const sortedOfferings = offerings.sort((a, b) => {
        return a.goal.min - b.goal.min;
      });

      await commit("SET_OFFERINGS", sortedOfferings);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async fetchCompany({ commit, dispatch }, companyId) {
    try {
      const docRef = doc(db, `companies/${companyId}`);
      const snapshot = await getDoc(docRef);
      const company = snapshot.data();

      await dispatch("fetchOfferings", companyId);
      await dispatch("fetchComments", companyId);
      await dispatch("fetchTestimonials", companyId);
      await commit("SET_COMPANY", company);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async fetchCompanies({ commit }) {
    try {
      const companiesRef = collection(db, "companies");
      const q = query(companiesRef);
      const querySnapshot = await getDocs(q);
      const actions = querySnapshot.docs.map(async (company) => {
        const companyData = company.data();
        const offeringsRef = collection(db, "offerings");
        const q = query(
          offeringsRef,
          where("companyId", "==", companyData.uid),
          where("published", "==", true),
          where("platforms", "array-contains", "WFP"),
          orderBy("createdAt")
        );
        const snapshot = await getDocs(q);
        companyData.offerings = snapshot.docs.map((o) => o.data());
        return companyData;
      });
      const listOfCompanies = await Promise.all(actions);
      await commit("SET_COMPANIES", listOfCompanies);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async fetchComments({ commit }, companyId) {
    try {
      const colRef = collection(db, "comments");
      const q = query(
        colRef,
        where("companyId", "==", companyId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const comments = snapshot.docs.map((comment) => comment.data());

        await commit("SET_COMMENTS", comments);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async submitComment({ state, rootState }, { message, role, companyId }) {
    try {
      const docRef = doc(collection(db, "comments"));
      const dto = {
        message,
        role,
        name: {
          first: rootState.profile.first_name,
          last: rootState.profile.last_name,
        },
        userId: rootState.auth.userId,
        avatar: rootState.profile.avatar || null,
        companyId,
        approved: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        uid: docRef.id,
      };
      await addDoc(docRef, dto);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async fetchTestimonials({ commit }, companyId) {
    try {
      const colRef = collection(db, "testimonials");
      const q = query(colRef, where("companyId", "==", companyId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((t) => t.data());

      await commit("SET_TESTIMONIALS", data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
