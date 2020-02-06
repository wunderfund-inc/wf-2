<template lang="pug">
  b-modal#modal-entity-form(
    ref="entity-modal"
    title="Create an Entity"
    size="lg"
    hide-footer
  )
    form(@submit.prevent="handleSubmit")
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
        b-col(md="6")
          entity-annual-revenue
        b-col(md="6")
          entity-net-assets
      b-row
        b-col
          entity-email-switch
          entity-email-input(v-if="useDifferentEmail")
      b-form-group(
        label="Location of the Entity:"
        label-class="font-weight-bold py-2"
      )
        b-row
          b-col(md="6")
            entity-street-1-input
          b-col(md="6")
            entity-street-2-input
        b-row
          b-col(md="4")
            entity-city-input
          b-col(md="4")
            entity-state-input
          b-col(md="4")
            entity-postal-input
      b-row
        b-col
          entity-accreditation
      b-row
        b-col
          entity-nonspecific
      b-row
        b-col
          b-button.mr-2(type="submit" variant="success") Create
          b-button(@click="cancelForm" variant="danger") Cancel
</template>

<script>
import { mapGetters } from "vuex";
import EntityName from "@/components/Form/Entity/EntityName";
import EntityType from "@/components/Form/Entity/EntityType";
import EntityEin from "@/components/Form/Entity/EntityEin";
import EntityAnnualRevenue from "@/components/Form/Entity/EntityAnnualRevenue";
import EntityNetAssets from "@/components/Form/Entity/EntityNetAssets";
import EntityEmailSwitch from "@/components/Form/Entity/EntityEmailSwitch";
import EntityEmailInput from "@/components/Form/Entity/EntityEmailInput";
import EntityStreet1Input from "@/components/Form/Entity/EntityAddress/Street1Input";
import EntityStreet2Input from "@/components/Form/Entity/EntityAddress/Street2Input";
import EntityCityInput from "@/components/Form/Entity/EntityAddress/CityInput";
import EntityStateInput from "@/components/Form/Entity/EntityAddress/StateInput";
import EntityPostalInput from "@/components/Form/Entity/EntityAddress/PostalInput";
import EntityAccreditation from "@/components/Form/Entity/EntityAccreditation";
import EntityNonspecific from "@/components/Form/Entity/EntityNonspecific";

export default {
  components: {
    EntityName,
    EntityType,
    EntityEin,
    EntityAnnualRevenue,
    EntityNetAssets,
    EntityEmailSwitch,
    EntityEmailInput,
    EntityStreet1Input,
    EntityStreet2Input,
    EntityCityInput,
    EntityStateInput,
    EntityPostalInput,
    EntityAccreditation,
    EntityNonspecific
  },
  computed: {
    ...mapGetters({
      entityData: "user/entityForm",
      currentUserAuth: "auth/currentUserAuth"
    }),
    useDifferentEmail() {
      return this.entityData.differentEmail;
    }
  },
  methods: {
    handleOk(event) {
      event.preventDefault();
      this.handleSubmit();
    },
    async cancelForm() {
      await this.$store.dispatch("user/clearEntityForm");
      await this.$refs["entity-modal"].hide();
    },
    async handleSubmit() {
      await this.$store.dispatch("user/createEntity", {
        entityData: this.entityData,
        currentUserAuth: this.currentUserAuth
      });
      await window.location.reload(true);
    }
  }
};
</script>
