<template>
  <b-form-group label="Entity Classification">
    <b-form-select v-model="entityType" :options="options">
      <template #first>
        <option :value="null" disabled>Please Select</option>
      </template>
    </b-form-select>
  </b-form-group>
</template>

<script>
export default {
  data() {
    return {
      options: [
        "Limited Liability Company",
        "Limited Partnership",
        "Revocable Trust",
        "Irrevocable Trust",
        "Corporation",
      ],
    };
  },
  computed: {
    entityType: {
      get() {
        return this.$store.state.profile.entity_type;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "entity_type",
          val,
        });
      },
    },
  },
};
</script>
