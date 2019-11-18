<template lang="pug">
  form
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
        b-button(variant="success") Save Changes
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
  }
};
</script>
