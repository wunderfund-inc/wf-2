<template lang="pug">
  form
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
</template>

<script>
import Street1Input from "@/components/Form/Profile/Address/Street1Input";
import Street2Input from "@/components/Form/Profile/Address/Street2Input";
import CityInput from "@/components/Form/Profile/Address/CityInput";
import StateInput from "@/components/Form/Profile/Address/StateInput";
import PostalInput from "@/components/Form/Profile/Address/PostalInput";

export default {
  components: {
    Street1Input,
    Street2Input,
    CityInput,
    StateInput,
    PostalInput
  }
};
</script>
