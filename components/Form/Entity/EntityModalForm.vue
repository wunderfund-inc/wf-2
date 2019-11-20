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
      b-row
        b-col
          entity-name
          //- entity-street-1-input
        b-col
          entity-name
          //- entity-street-2-input
      b-row
        b-col
          entity-name
          //- entity-city-input
        b-col
          entity-name
          //- entity-state-input
        b-col
          entity-name
          //- entity-postal-input
</template>

<script>
import EntityName from "@/components/Form/Entity/EntityName";
import EntityType from "@/components/Form/Entity/EntityType";
import EntityEin from "@/components/Form/Entity/EntityEin";
import EntityEmailSwitch from "@/components/Form/Entity/EntityEmailSwitch";
import EntityEmailInput from "@/components/Form/Entity/EntityEmailInput";

export default {
  components: {
    EntityName,
    EntityType,
    EntityEin,
    EntityEmailSwitch,
    EntityEmailInput
  },
  computed: {
    useDifferentEmail() {
      return this.$store.getters["user/entityForm"].differentEmail;
    }
  }
};
</script>
