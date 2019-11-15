<template lang="pug">
  section
    hr
    b-container
      p Fill out the following information now, save some time when investing!
      address-form
</template>

<script>
import AddressForm from "@/components/Form/Profile/AddressForm";

export default {
  components: {
    AddressForm
  }
};
</script>
