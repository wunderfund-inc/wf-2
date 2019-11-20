<template lang="pug">
  b-card.mb-4(no-body)
    b-card-body.px-0
      b-container
        b-row.form-inline
          b-col
            h1.mb-0 My Entities
          b-col(cols="3").text-right
            entity-modal-form
            b-button(
              variant="outline-success"
              v-b-modal.modal-entity-form
              size="sm"
            ) Create
      b-card-text.mt-3.mb-0.px-3(v-if="entities.length === 0") It doesn't look like you any entities on file with us.
    //- b-list-group(flush)
      b-list-group-item(
        v-for="(entity, index) in entities"
        :key="index"
      )
        account-entity-item(:entity="entity")
</template>

<script>
// import AccountEntityItem from "@/components/Account/AccountEntityItem";
import EntityModalForm from "@/components/Form/Entity/EntityModalForm";

export default {
  components: {
    // AccountEntityItem,
    EntityModalForm
  },
  props: {
    entities: {
      type: Array,
      default() {},
      required: true
    }
  }
};
</script>
