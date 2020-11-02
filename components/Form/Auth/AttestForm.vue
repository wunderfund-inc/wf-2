<template>
  <div class="card bg-light mb-3">
    <div class="container my-3">
      <form @submit.prevent="submitAttestationForm">
        <b-form-checkbox v-model="isEntity" switch class="py-2">
          I'm using this account to invest on behalf an entity.
        </b-form-checkbox>

        <template v-if="isEntity">
          <small class="text-muted">
            Keep in mind, we'll ask for some more information (EIN,
            accreditation documents, etc.) about your entity before you can
            invest.
          </small>
        </template>

        <b-form-group
          label="Also, you must acknowledge the following:"
          class="mt-3"
        >
          <b-form-checkbox
            v-model="$v.form.attestations.$model[0]"
            value="The user acknowledges there are inherent risks investing in a startup."
            switch
            class="py-2"
          >
            I understand there are
            <nuxt-link to="/legal/investor-agreement" target="_blank">
              risks in investing on a crowdfunding platform.
            </nuxt-link>
          </b-form-checkbox>

          <b-form-checkbox
            v-model="$v.form.attestations.$model[1]"
            value="The user agrees to Wunderfund's Terms of Use."
            switch
            class="py-2"
          >
            I'm agreeing to Wunderfund's
            <nuxt-link to="/legal/terms-of-use" target="_blank">
              Terms of Use.
            </nuxt-link>
          </b-form-checkbox>

          <b-form-checkbox
            v-model="$v.form.attestations.$model[2]"
            value="The user agrees to Wunderfund's Privacy Policy."
            switch
            class="py-2"
          >
            I'm agreeing to Wunderfund's
            <nuxt-link to="/legal/privacy-policy" target="_blank">
              Privacy Policy.
            </nuxt-link>
          </b-form-checkbox>

          <b-form-checkbox
            v-model="$v.form.attestations.$model[3]"
            value="The user agrees to Wunderfund's disclosure for the platform generating income."
            switch
            class="py-2"
          >
            I understand that Wunderfund has a way to
            <nuxt-link to="/faq/company" target="_blank">
              earn income
            </nuxt-link>
            with every campaign offered on this platform.
          </b-form-checkbox>
        </b-form-group>
        <button
          v-if="!submitting"
          :disabled="$v.validAttestations.$invalid"
          class="btn btn-block btn-primary"
          type="submit"
        >
          Attest
        </button>
        <button v-else class="btn btn-block btn-primary" type="submit" disabled>
          Updating...
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      submitting: false,
      error: null,
      form: {
        attestations: [],
      },
    };
  },
  computed: {
    isEntity: {
      get() {
        return this.$store.state.profile.isEntity;
      },
      set(val) {
        this.$store.dispatch("profile/setAttribute", {
          prop: "is_entity",
          val,
        });
      },
    },
  },
  validations: {
    form: {
      attestations: {
        required,
        minLength: minLength(4),
      },
    },
    validAttestations: ["form.attestations"],
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async submitAttestationForm() {
      this.submitting = true;

      await this.$store.dispatch("profile/setAttribute", {
        prop: "attestations",
        val: this.form.attestations,
      });

      await this.$store.dispatch("profile/update", {
        userId: this.$store.state.auth.userId,
        flag: "attestations",
      });

      await this.$router.push("/account");
    },
  },
};
</script>
