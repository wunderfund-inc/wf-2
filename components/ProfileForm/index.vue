<template>
  <form method="post" @submit.prevent="updateProfile">
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
      <div class="col-12 col-md-6">
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
    <div class="form-row mt-4">
      <div class="col">
        <div class="card">
          <pre>{{ validatedForm }}</pre>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { countries, states } from "./choices";
import { profileFormState, isProfileFormValid } from "./form";

export default {
  data() {
    return {
      countries,
      states,
      form: {
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
    };
  },
  computed: {
    validatedForm() {
      return profileFormState(this.form);
    },
    validForm() {
      return isProfileFormValid(profileFormState(this.form));
    },
  },
};
</script>
