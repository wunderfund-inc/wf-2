<template lang="pug">
  b-modal#modal-entity-form(
    title="Create an Entity"
    ok-title="Create"
    @ok="handleOk"
  )
    form(@submit.stop.prevent="handleSubmit")
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
</template>

<script>
import { mapGetters } from "vuex";
import firebase, { db, timestamp } from "@/plugins/firebase";
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
    EntityAccreditation
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
    async handleSubmit() {
      // Save entity data to its own collection, referencing a user's uid
      const ref = await db.collection("entities").doc();
      const data = {
        uid: ref.id,
        ...this.entityData
      };
      await ref.set({
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      // Save entity data to a current user's list of entities
      const uid = this.currentUserAuth.uid || this.currentUserAuth.user_id;
      await db
        .collection("users")
        .doc(uid)
        .update({ entities: firebase.firestore.FieldValue.arrayUnion(data) });
      // Refresh the page
      window.location.reload();
    }
  }
};
</script>
