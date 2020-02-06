<template lang="pug">
  aside
    b-media.my-auto(vertical-align="center")
      b-row.form-inline
        b-col
          h2.mb-0.py-4.align-middle {{ entity.name }}
        b-col(cols="3").text-right
          b-button(
            variant="outline-secondary"
            v-b-toggle="'entity-' + entity.uid"
            size="sm"
          )
            span.when-opened Close
            span.when-closed Expand
    b-collapse(:id="`entity-${entity.uid}`" accordion="entity")
      b-table(
        :items="[{ classification: entity.classification, employer_identification_number: entity.ein, email: entity.differentEmail ? entity.email : currentUserEmail, address: entity.address }]"
        outlined
        responsive
        stacked
        small
      )
        template(v-slot:cell(address)="data")
          address.mb-0
            span {{ data.value.street1 }}
            br
            span(v-if="data.value.street2") {{ data.value.street2 }}
            br(v-if="data.value.street2")
            span {{ data.value.city }}, {{ data.value.state }} {{ data.value.postal }}
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
      default() {},
      name: {
        type: String,
        required: true
      },
      classification: {
        type: String,
        required: true
      },
      ein: {
        type: String,
        required: true
      },
      differentEmail: {
        type: Boolean,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      address: {
        type: Object,
        default() {},
        street1: {
          type: String,
          required: true
        },
        street2: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        postal: {
          type: String,
          required: true
        }
      }
    }
  },
  computed: {
    currentUserEmail() {
      return this.$store.getters["user/currentUser"].email;
    }
  }
};
</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
