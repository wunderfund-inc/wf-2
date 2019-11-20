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
          entity-name
          //- entity-ein
      b-row
        b-col
          entity-name
          //- entity-email-verify
          //- entity-email-input
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

export default {
  components: {
    EntityName,
    EntityType
  }
};
</script>
