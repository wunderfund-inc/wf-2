<template>
  <div class="form-group">
    <label>Which Entity are you representing?</label>
    <b-form-select v-model="localState">
      <template v-slot:first>
        <option :value="null" disabled>-- Please select an Entity --</option>
      </template>
      <option v-for="(entity, index) in entities" :key="index" :value="entity">
        {{ entity.name }}
      </option>
    </b-form-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: Object,
      default() {},
      required: true
    }
  },
  computed: {
    ...mapGetters({
      entities: "user/entities"
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
