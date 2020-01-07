<template lang="pug">
  b-form(@submit.stop.prevent="updateProfileOnFirebase")
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
import { mapGetters } from "vuex";
import { db, timestamp } from "@/plugins/firebase";
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
    ...mapGetters({
      name: "user/name",
      address: "user/address",
      validProfileForm: "user/validProfileForm",
      currentUser: ["user/currentUser"]
    })
  },
  methods: {
    async updateProfileOnFirebase() {
      await db
        .collection("users")
        .doc(this.currentUser.uid)
        .update({
          name: this.name,
          address: this.address,
          updatedAt: timestamp
        });
      window.location.reload();
    }
  }
};
</script>
