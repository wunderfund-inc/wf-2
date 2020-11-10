import { db, timestamp } from "@/plugins/firebase";
import { calculatePersonalLimit } from "@/helpers/finance";
import { accredited, validAttestations } from "@/helpers/validators";

export const state = () => ({
  accreditation_ai: 0,
  accreditation_nw: 0,
  address_city: null,
  address_postal: null,
  address_state: null,
  address_street_1: null,
  address_street_2: null,
  avatar: null,
  dob: null,
  first_name: null,
  last_name: null,
  attestations: [],
  is_entity: false,
  entity_name: null,
  entity_type: null,
  entity_ein: null,
  transact_api_account_id: null,
});

export const getters = {
  isEntity(state) {
    return state.is_entity;
  },
  spendPoolCurrent(state) {
    const ai = state.accreditation_ai;
    const nw = state.accreditation_nw;
    return calculatePersonalLimit(ai, nw); // TODO: minus spent too
  },
  spendPoolMax(state) {
    const ai = state.accreditation_ai;
    const nw = state.accreditation_nw;
    return calculatePersonalLimit(ai, nw);
  },
  accredited(state) {
    const ai = state.accreditation_ai;
    const nw = state.accreditation_nw;
    return accredited(ai, nw);
  },
  validAttestations(state) {
    return validAttestations(state.attestations);
  },
  valid(state) {
    const firstName = state.first_name;
    const lastName = state.last_name;
    const street1 = state.address_street_1;
    const city = state.address_city;
    const addressState = state.address_state;
    const postal = state.address_postal;

    const validFirstName = firstName && firstName.length > 0;
    const validLastName = lastName && lastName.length > 0;

    const dob = state.dob;
    const dobRegex = /(?:19|20)\d{2}-((?:0[1-9])|(?:1[0-2]))-((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))/;

    const validDob = dobRegex.test(dob);
    const validStreet1 = street1 && street1.length > 0;
    const validCity = city && city.length > 2;
    const validState = addressState && addressState.length === 2;
    const validPostal = postal && postal.length >= 5;

    const validName = validFirstName && validLastName;
    const validAddress = validStreet1 && validCity && validState && validPostal;

    const entityName = state.entity_name;
    const entityType = state.entity_type;
    const entityEin = state.entity_ein;
    const einRegex = /^[1-9]\d?-\d{7}$/;

    const validEntityName = entityName && entityName.length > 0;
    const validEntityType = entityType && entityType.length > 0;
    const validEntityEin = einRegex.test(entityEin);
    const validEntity = validEntityName && validEntityType && validEntityEin;

    const validId =
      state.transact_api_account_id && state.transact_api_account_id.length > 0;

    if (state.is_entity) {
      return validName && validEntity && validAddress && validId;
    } else {
      return validName && validDob && validAddress && validId;
    }
  },
};

export const mutations = {
  SET_PROFILE_ATTRIBUTE(state, { prop, val }) {
    state[prop] = val;
  },
};

export const actions = {
  async fetch({ commit }, userId) {
    try {
      const userRef = await db.collection("users").doc(userId).get();
      const userData = userRef.data();

      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "accreditation_ai",
        val: userData.accreditation_ai,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "accreditation_nw",
        val: userData.accreditation_nw,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "address_city",
        val: userData.address_city,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "address_postal",
        val: userData.address_postal,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "address_state",
        val: userData.address_state,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "address_street_1",
        val: userData.address_street_1,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "address_street_2",
        val: userData.address_street_2,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "avatar",
        val: userData.avatar,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "dob",
        val: userData.dob,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "first_name",
        val: userData.first_name,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "last_name",
        val: userData.last_name,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "is_entity",
        val: userData.is_entity,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "attestations",
        val: userData.attestations,
      });
      await commit("SET_PROFILE_ATTRIBUTE", {
        prop: "transact_api_account_id",
        val: userData.transact_api_account_id,
      });

      if (userData.is_entity) {
        await commit("SET_PROFILE_ATTRIBUTE", {
          prop: "entity_name",
          val: userData.entity_name,
        });
        await commit("SET_PROFILE_ATTRIBUTE", {
          prop: "entity_type",
          val: userData.entity_type,
        });
        await commit("SET_PROFILE_ATTRIBUTE", {
          prop: "entity_ein",
          val: userData.entity_ein,
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  async setAttribute({ commit }, { prop, val }) {
    try {
      await commit("SET_PROFILE_ATTRIBUTE", { prop, val });
    } catch (error) {
      throw new Error(error);
    }
  },
  async update({ state }, { userId, flag }) {
    try {
      let dto;

      if (flag === "profile") {
        dto = {
          accreditation_ai: state.accreditation_ai,
          accreditation_nw: state.accreditation_nw,
          address_city: state.address_city,
          address_postal: state.address_postal,
          address_state: state.address_state,
          address_street_1: state.address_street_1,
          address_street_2: state.address_street_2,
          avatar: state.avatar,
          first_name: state.first_name,
          last_name: state.last_name,
          date_updated: timestamp,
        };

        if (state.is_entity) {
          dto.entity_name = state.entity_name;
          dto.entity_type = state.entity_type;
          dto.entity_ein = state.entity_ein;
        } else {
          dto.dob = state.dob;
        }

        await db
          .collection("users")
          .doc(userId)
          .update({
            ...dto,
            flag: `update:${state.is_entity ? "entity" : "individual"}`,
          });
      } else {
        /**
         * using attestation form data (for now, extend the if statement if
         * there's more forms to fill out)
         */
        dto = {
          is_entity: state.is_entity,
          attestations: state.attestations,
          date_updated: timestamp,
        };

        await db
          .collection("users")
          .doc(userId)
          .update({
            ...dto,
            flag: "update:attestation",
          });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateAtCheckout(context, { userId, payload }) {
    try {
      await db
        .collection("users")
        .doc(userId)
        .update({
          ...payload,
          date_updated: timestamp,
          flag: "update:checkout",
        });
    } catch (error) {
      throw new Error(error);
    }
  },
};
