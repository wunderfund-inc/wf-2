<template lang="pug">
  b-form-group(
    label="Employer Identification Number"
    label-for="entity-ein"
  )
    b-form-input#entity-ein(v-model="entityEIN")
    small.text-danger(
      v-if="$v.entityEIN.$dirty && $v.entityEIN.$anyError"
    ) - Invalid EIN
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
        return this.$store.getters["user/entityForm"].ein;
      },
      set(val) {
        this.$store.commit("user/SET_ENTITY_FORM_ATTRIBUTE", { ein: val });
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
