<template>
  <b-overlay :show="updatingProfile" rounded="sm">
    <template #overlay>
      <div class="text-center">
        <b-spinner large variant="secondary" />
        <p class="pt-3">Updating...</p>
      </div>
    </template>
    <form @submit.prevent="updateProfile">
      <template v-if="isEntity">
        <div class="form-row">
          <div class="col">
            <b-form-group label="Entity Name" label-for="entity-name">
              <b-form-input id="entity-name" v-model="form.entityName" />
            </b-form-group>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <b-form-group label="Entity Classification">
              <b-form-select v-model="form.entityType" :options="options">
                <template #first>
                  <option :value="null" disabled>Please Select</option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <b-form-group
              label="Employer Identification Number (EIN)"
              label-for="entity-ein"
            >
              <b-form-input id="entity-ein" v-model="form.entityEin" />
            </b-form-group>
          </div>
        </div>
      </template>
      <div class="form-row">
        <div class="col-md-6">
          <b-form-group label="First Name:" label-for="input-fname">
            <b-form-input
              id="input-fname"
              v-model="form.firstName"
              type="text"
            />
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group label="Last Name:" label-for="input-lname">
            <b-form-input
              id="input-lname"
              v-model="form.lastName"
              type="text"
            />
          </b-form-group>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="input-dob">Date of Birth</label>
            <input
              id="input-dob"
              v-model="form.dob"
              type="date"
              class="form-control"
            />
          </div>
        </div>
      </div>

      <b-form-group label="Street 1:" label-for="input-street-1">
        <b-form-input id="input-street-1" v-model="form.street1" type="text" />
      </b-form-group>

      <b-form-group label="Street 2:" label-for="input-street-2">
        <b-form-input id="input-street-2" v-model="form.street2" type="text" />
      </b-form-group>

      <b-form-group label="City:" label-for="input-city">
        <b-form-input id="input-city" v-model="form.city" type="text" />
      </b-form-group>

      <div class="form-row">
        <div class="col-md-6">
          <b-form-group label="State">
            <b-form-select v-model="form.state" :options="states">
              <template #first>
                <option :value="null" disabled>-- Please Select --</option>
              </template>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="col-md-6">
          <b-form-group label="Postal:" label-for="input-postal">
            <b-form-input id="input-postal" v-model="form.postal" type="text" />
          </b-form-group>
        </div>
      </div>
      <div class="form-inline">
        <b-button type="submit" variant="success">Update</b-button>
        <b-link @click.prevent="clearForm" class="ml-3">Cancel</b-link>
      </div>
    </form>
  </b-overlay>
</template>

<script>
import states from "../../states";

export default {
  data() {
    return {
      updatingProfile: false,
      states,
      options: [
        "Limited Liability Company",
        "Limited Partnership",
        "Revocable Trust",
        "Irrevocable Trust",
        "Corporation"
      ],
      form: {
        firstName: null,
        lastName: null,
        dob: null,
        street1: null,
        street2: null,
        city: null,
        state: null,
        postal: null,
        isEntity: false,
        entityName: null,
        entityType: null,
        entityEin: null
      }
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    isEntity() {
      return this.$store.state.profile.is_entity;
    }
  },
  created() {
    const {
      is_entity: isEntity,
      first_name: firstName,
      last_name: lastName,
      dob,
      address_street_1: street1,
      address_street_2: street2,
      address_city: city,
      address_state: state,
      address_postal: postal,
      entity_name: entityName,
      entity_type: entityType,
      entity_ein: entityEin
    } = this.$store.state.profile;

    this.form.firstName = firstName;
    this.form.lastName = lastName;
    this.form.dob = dob;
    this.form.street1 = street1;
    this.form.street2 = street2;
    this.form.city = city;
    this.form.state = state;
    this.form.postal = postal;

    this.form.isEntity = isEntity;
    this.form.entityName = isEntity ? entityName : null;
    this.form.entityType = isEntity ? entityType : null;
    this.form.entityEin = isEntity ? entityEin : null;
  },
  methods: {
    async updateProfile() {
      try {
        this.updatingProfile = true;

        const payload = {
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          dob: this.form.dob,
          address_street_1: this.form.street1,
          address_street_2: this.form.street2,
          address_city: this.form.city,
          address_state: this.form.state,
          address_postal: this.form.postal
        };

        if (this.form.isEntity) {
          payload.entity_name = this.form.entityName;
          payload.entity_type = this.form.entityType;
          payload.entity_ein = this.form.entityEin;
        }

        await this.$store.dispatch("profile/updateAtCheckout", {
          userId: this.userId,
          payload
        });

        await this.$store.dispatch("profile/fetch", this.userId);

        this.updatingProfile = false;

        this.$store.dispatch("agreement/setAttribute", {
          prop: "editingProfile",
          val: false
        });
      } catch (error) {
        throw Error(error);
      }
    },
    clearForm() {
      this.form.entityName = null;
      this.form.entityType = null;
      this.form.entityEin = null;
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.dob = null;
      this.form.street1 = null;
      this.form.street2 = null;
      this.form.city = null;
      this.form.state = null;
      this.form.postal = null;

      this.$store.dispatch("agreement/setAttribute", {
        prop: "editingProfile",
        val: false
      });
    }
  }
};
</script>
