<template>
  <b-form-group label="I'd like to invest...">
    <b-form-radio v-model="localState" value="PERSONAL" name="selected-type">
      Personally.
    </b-form-radio>
    <b-form-radio
      v-model="localState"
      :disabled="!hasEntities"
      value="ENTITY"
      name="selected-type"
    >
      on behalf an Entity.
      <div v-if="!hasEntities">
        <br />
        <small class="text-muted">
          You don't have any entities filed with us.
        </small>
      </div>
    </b-form-radio>
  </b-form-group>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      hasEntities: "user/hasEntities"
    }),
    localState: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
