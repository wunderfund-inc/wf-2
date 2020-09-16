<template>
  <form @submit.prevent="saveProfile">
    <template v-if="isEntity">
      <div class="form-row">
        <div class="col">
          <input-entity-name />
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <input-entity-type />
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <input-entity-ein />
        </div>
      </div>
    </template>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <input-first-name />
      </div>
      <div class="col-12 col-md-6">
        <input-last-name />
      </div>
    </div>
    <div v-if="!isEntity" class="form-row">
      <div class="col-12 col-md-6">
        <input-dob />
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <input-address-street-1 />
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <input-address-street-2 />
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <input-address-city />
      </div>
      <div class="col-12 col-md-3">
        <input-address-state />
      </div>
      <div class="col-12 col-md-3">
        <input-address-postal />
      </div>
    </div>
    <slot>
      <div class="form-row">
        <div class="col">
          <b-button :variant="color" type="submit">Save Changes</b-button>
        </div>
      </div>
    </slot>
  </form>
</template>

<script>
import InputEntityName from "@/components/Form/Profile/InputEntityName";
import InputEntityType from "@/components/Form/Profile/InputEntityType";
import InputEntityEin from "@/components/Form/Profile/InputEntityEin";
import InputFirstName from "@/components/Form/Profile/InputFirstName";
import InputLastName from "@/components/Form/Profile/InputLastName";
import InputDob from "@/components/Form/Profile/InputDob";
import InputAddressStreet1 from "@/components/Form/Profile/InputAddressStreet1";
import InputAddressStreet2 from "@/components/Form/Profile/InputAddressStreet2";
import InputAddressCity from "@/components/Form/Profile/InputAddressCity";
import InputAddressState from "@/components/Form/Profile/InputAddressState";
import InputAddressPostal from "@/components/Form/Profile/InputAddressPostal";

export default {
  components: {
    InputEntityName,
    InputEntityType,
    InputEntityEin,
    InputFirstName,
    InputLastName,
    InputDob,
    InputAddressStreet1,
    InputAddressStreet2,
    InputAddressCity,
    InputAddressState,
    InputAddressPostal
  },
  computed: {
    isEntity() {
      return this.$store.state.profile.is_entity;
    },
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    }
  },
  methods: {
    async saveProfile() {
      await this.$store.dispatch("profile/update", {
        userId: this.$store.state.auth.userId,
        flag: "profile"
      });
      await window.location.replace("/account");
    }
  }
};
</script>
