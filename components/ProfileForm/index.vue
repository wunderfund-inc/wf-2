<template>
  <form method="post" @submit.prevent="updateProfile">
    <template v-if="user.is_entity">
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="entity-name">Name of the Entity</label>
            <input
              id="entity-name"
              v-model.trim="form.entityName"
              type="text"
              class="form-control"
              data-form-entityname
              placeholder="Wunderfund, LLC."
              aria-placeholder="Wunderfund, LLC."
              required
            />
            <small
              v-if="!validatedForm.entityName.valid"
              class="form-text text-danger pt-1"
            >
              {{ validatedForm.entityName.message }}
            </small>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="entity-type">Entity Classification</label>
            <select
              id="entity-type"
              v-model="form.entityType"
              class="form-control"
              aria-label="State"
              data-form-state
              required
            >
              <option value="Limited Liability Company">
                Limited Liability Company
              </option>
              <option value="Limited Partnership">Limited Partnership</option>
              <option value="Revocable Trust">Revocable Trust</option>
              <option value="Irrevocable Trust">Irrevocable Trust</option>
              <option value="Corporation">Corporation</option>
            </select>
            <small
              v-if="!validatedForm.entityType.valid"
              class="form-text text-danger pt-1"
            >
              {{ validatedForm.entityType.message }}
            </small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="entity-ein">Employer Identification Number (EIN)</label>
            <input
              id="entity-ein"
              v-model.trim="form.ein"
              type="text"
              class="form-control"
              data-form-entityein
              required
            />
            <small
              v-if="!validatedForm.ein.valid"
              class="form-text text-danger pt-1"
            >
              {{ validatedForm.ein.message }}
            </small>
          </div>
        </div>
      </div>
    </template>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            v-model.trim="form.firstName"
            type="text"
            class="form-control"
            data-form-firstname
            placeholder="Taylor"
            aria-placeholder="Taylor"
            required
          />
          <small
            v-if="!validatedForm.firstName.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.firstName.message }}
          </small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            v-model.trim="form.lastName"
            type="text"
            class="form-control"
            data-form-lastname
            placeholder="Wunder"
            aria-placeholder="Wunder"
            required
          />
          <small
            v-if="!validatedForm.lastName.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.lastName.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div v-if="!user.is_entity" class="col-12 col-md-6">
        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input
            id="dob"
            v-model.trim="form.dob"
            type="date"
            class="form-control"
            data-form-dob
            required
          />
          <small class="form-text text-muted">
            Must be 18 or older to invest on this platform.
          </small>
          <small
            v-if="!validatedForm.dob.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.dob.message }}
          </small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            v-model.trim="form.phone"
            type="text"
            class="form-control"
            data-form-phone
            required
          />
          <small class="form-text text-muted">
            Just in case companies you invest in needs to contact you, and
            you're unreachable via email.
          </small>
          <small
            v-if="!validatedForm.phone.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.phone.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12">
        <div class="form-group">
          <label for="street1">Street 1</label>
          <input
            id="street1"
            v-model.trim="form.street1"
            type="text"
            class="form-control"
            placeholder="123 Main Street"
            data-form-street1
            required
          />
          <small
            v-if="!validatedForm.street1.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.street1.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12">
        <div class="form-group">
          <label for="street2">Street 2</label>
          <input
            id="street2"
            v-model.trim="form.street2"
            type="text"
            class="form-control"
            data-form-street2
          />
          <small
            v-if="!validatedForm.street2.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.street2.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="city">City</label>
          <input
            id="city"
            v-model.trim="form.city"
            type="text"
            class="form-control"
            data-form-city
            required
          />
          <small
            v-if="!validatedForm.city.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.city.message }}
          </small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="state">State</label>
          <select
            id="state"
            v-model="form.state"
            class="form-control"
            aria-label="State"
            data-form-state
            required
          >
            <option
              v-for="(state, index) in states"
              :key="index"
              :value="state.abbreviation"
            >
              {{ state.name }}
            </option>
          </select>
          <small
            v-if="!validatedForm.state.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.state.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="country">Country</label>
          <select
            id="country"
            v-model="form.country"
            class="form-control"
            aria-label="Country"
            data-form-country
            required
          >
            <option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.code"
            >
              {{ country.name }}
            </option>
          </select>
          <small
            v-if="!validatedForm.country.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.country.message }}
          </small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="city">Postal</label>
          <input
            id="postal"
            v-model.trim="form.postal"
            type="text"
            class="form-control"
            data-form-postal
            required
          />
          <small
            v-if="!validatedForm.postal.valid"
            class="form-text text-danger pt-1"
          >
            {{ validatedForm.postal.message }}
          </small>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <button
          class="btn btn-primary btn-block"
          type="submit"
          :disabled="!validForm"
        >
          Update
        </button>
      </div>
    </div>
    <div v-if="error" class="form-row mt-2">
      <div class="col">
        <small class="text-danger">{{ error }}</small>
      </div>
    </div>
  </form>
</template>

<script>
import { db, timestamp } from "../../plugins/firebase";
import { countries, states } from "./choices";
import { profileFormState, isProfileFormValid } from "./form";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countries,
      states,
      form: {
        entityName: "",
        entityType: "",
        ein: "",
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        country: "",
        postal: "",
      },
      error: null,
    };
  },
  computed: {
    validatedForm() {
      return profileFormState(this.form, this.user.is_entity);
    },
    validForm() {
      const isEntity = this.user.is_entity;
      return isProfileFormValid(
        profileFormState(this.form, isEntity),
        isEntity
      );
    },
  },
  created() {
    this.form.firstName = this.user.first_name || "";
    this.form.lastName = this.user.last_name || "";
    this.form.phone = this.user.phone || "";
    this.form.street1 = this.user.address_street_1 || "";
    this.form.street2 = this.user.address_street_2 || null;
    this.form.city = this.user.address_city || "";
    this.form.state = this.user.address_state || "";
    this.form.country = this.user.address_country || "";
    this.form.postal = this.user.address_postal || "";

    if (this.user.is_entity) {
      this.form.entityName = this.user.entity_name || "";
      this.form.entityType = this.user.entity_type || "";
      this.form.ein = this.user.entity_ein || "";
    } else {
      this.form.dob = this.user.dob || "";
    }
  },
  methods: {
    async updateProfile() {
      try {
        const dto = {
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          phone: this.form.phone,
          address_street_1: this.form.street1,
          address_street_2: this.form.street2,
          address_city: this.form.city,
          address_state: this.form.state,
          address_country: this.form.country,
          address_postal: this.form.postal,
          date_updated: timestamp,
          flag: `update:${this.user.is_entity ? "entity" : "individual"}`,
        };

        if (this.user.is_entity) {
          dto.entity_name = this.form.entity_name;
          dto.entity_type = this.form.entity_type;
          dto.entity_ein = this.form.entity_ein;
        } else {
          dto.dob = this.form.dob;
        }

        await db.collection("users").doc(this.user.uid).update(dto);

        const urlString = this.$route.params.companyId
          ? `/${this.$route.params.companyId}/invest`
          : "/account?action=profile-updated";

        return window.location.replace(urlString);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
