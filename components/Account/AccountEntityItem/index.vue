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
      h5 Business Classification:
        |
        |
        span.text-success {{ entity.classification }}
      h5 Employer Identification Number:
        |
        |
        span.text-success {{ entity.ein | einStrFormat }}
      h5 Email used for signing agreements:
        |
        |
        span.text-success(v-if="entity.differentEmail") {{ entity.email }}
        span.text-success(v-else) {{ currentUserEmail }}
      h5 Entity Address:
      h6
        address.text-success 1053 Saint Gregory Street
          br
          span Floor 2
          br
          span Cincinnati, OH 45208
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
