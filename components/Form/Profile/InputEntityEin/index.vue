<template>
  <b-form-group
    label="Employer Identification Number (EIN)"
    label-for="entity-ein"
  >
    <b-form-input id="entity-ein" v-model="entityEIN"></b-form-input>
    <small
      v-if="$v.entityEIN.$dirty && $v.entityEIN.$anyError"
      class="text-danger"
    >
      - Invalid EIN
    </small>
  </b-form-group>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

const einRegex = /^(0[1-6]||1[0-6]|2[0-7]|[345]\d|[68][0-8]|7[1-7]|9[0-58-9])-?\d{7}$/;

export default {
  mixins: [validationMixin],
  validations: {
    entityEIN: {
      required,
      validRegex(ein) {
        return einRegex.test(ein);
      }
    }
  },
  computed: {
    entityEIN: {
      get() {
        return this.$store.state.profile.entity_ein;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "entity_ein",
          val
        });
        this.$v.entityEIN.$touch();
      }
    }
  },
  methods: {
    validEIN() {
      const { $dirty, $error } = this.$v.entityEIN;
      return $dirty ? !$error : null;
    }
  }
};
</script>
