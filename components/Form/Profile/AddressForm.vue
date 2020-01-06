<template lang="pug">
  b-form(@submit.stop.prevent="updateProfile")
    b-row
      b-col(md="6")
        first-name-input
      b-col(md="6")
        last-name-input
    b-row
      b-col(md="6")
        street-1-input
      b-col(md="6")
        street-2-input
    b-row
      b-col(md="4")
        city-input
      b-col(md="4")
        state-input
      b-col(md="4")
        postal-input
    b-row
      b-col
        b-button(
          variant="success"
          type="submit"
          :disabled="!validProfileForm"
        ) Save Changes
</template>

<script>
import FirstNameInput from "@/components/Form/Profile/FirstNameInput";
import LastNameInput from "@/components/Form/Profile/LastNameInput";
import Street1Input from "@/components/Form/Profile/Address/Street1Input";
import Street2Input from "@/components/Form/Profile/Address/Street2Input";
import CityInput from "@/components/Form/Profile/Address/CityInput";
import StateInput from "@/components/Form/Profile/Address/StateInput";
import PostalInput from "@/components/Form/Profile/Address/PostalInput";

export default {
  components: {
    FirstNameInput,
    LastNameInput,
    Street1Input,
    Street2Input,
    CityInput,
    StateInput,
    PostalInput
  },
  computed: {
    name() {
      return this.$store.getters["user/name"];
    },
    address() {
      return this.$store.getters["user/address"];
    },
    formData() {
      const name = { ...this.name };
      const address = { ...this.address };
      return { name, address };
    },
    validProfileForm() {
      return this.$store.getters["user/validProfileForm"];
    }
  },
  methods: {
    updateProfile() {
      // TODO: send to firebase
      // eslint-disable-next-line
      console.log("Form submission to update profile:", this.formData);
    }
  }
};
</script>
