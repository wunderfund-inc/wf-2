<template lang="pug">
  b-modal#modal-entity-form(title="Creating an Entity")
    form
      b-row
        b-col
          entity-name
      b-row
        b-col
          entity-type
      b-row
        b-col
          entity-ein
      b-row
        b-col
          entity-email-switch
          entity-email-input(v-if="useDifferentEmail")
      b-form-group(
        label="Location of the Entity:"
        label-class="font-weight-bold py-2"
      )
        b-row
          b-col
            entity-street-1-input
          b-col
            entity-street-2-input
        b-row
          b-col
            entity-city-input
          b-col
            entity-state-input
          b-col
            entity-postal-input
</template>

<script>
import EntityName from "@/components/Form/Entity/EntityName";
import EntityType from "@/components/Form/Entity/EntityType";
import EntityEin from "@/components/Form/Entity/EntityEin";
import EntityEmailSwitch from "@/components/Form/Entity/EntityEmailSwitch";
import EntityEmailInput from "@/components/Form/Entity/EntityEmailInput";
import EntityStreet1Input from "@/components/Form/Entity/EntityAddress/Street1Input";
import EntityStreet2Input from "@/components/Form/Entity/EntityAddress/Street2Input";
import EntityCityInput from "@/components/Form/Entity/EntityAddress/CityInput";
import EntityStateInput from "@/components/Form/Entity/EntityAddress/StateInput";
import EntityPostalInput from "@/components/Form/Entity/EntityAddress/PostalInput";

export default {
  components: {
    EntityName,
    EntityType,
    EntityEin,
    EntityEmailSwitch,
    EntityEmailInput,
    EntityStreet1Input,
    EntityStreet2Input,
    EntityCityInput,
    EntityStateInput,
    EntityPostalInput
  },
  computed: {
    useDifferentEmail() {
      return this.$store.getters["user/entityForm"].differentEmail;
    }
  }
};
</script>
