<template>
  <transition name="fade" mode="out-in">
    <b-form @submit.prevent="submitComment" v-if="!formSubmitted" class="form">
      <b-form-group>
        <b-form-textarea
          v-model="form.message"
          name="comment-message"
          placeholder="What do you want to say?"
          rows="3"
          max-rows="6"
        />
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="isPromoting" @change="checkRole" switch>
          I work for this company and/or am promoting on behalf of them.
        </b-form-checkbox>
      </b-form-group>
      <b-form-group v-if="isPromoting">
        <b-form-radio-group v-model="form.role" :options="roleOptions" />
      </b-form-group>
      <b-button
        :disabled="!formValidated"
        type="submit"
        variant="success"
        size="md"
      >
        Comment
      </b-button>
      <slot />
    </b-form>
    <p v-else>Your message has been submitted for review. Thanks!</p>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      formSubmitted: false,
      isPromoting: false,
      form: {
        message: "",
        role: "INVESTOR"
      },
      roleOptions: [
        { text: "as a Promoter", value: "PROMOTER" },
        { text: "as a Founder", value: "FOUNDER" },
        { text: "as an Employee", value: "EMPLOYEE" }
      ]
    };
  },
  computed: {
    formValidated() {
      const validLength = this.form.message.length > 0;
      const validOtherRole = this.form.role !== "INVESTOR";
      return (this.isPromoting === true ? validOtherRole : true) && validLength;
    }
  },
  methods: {
    submitComment() {
      this.formSubmitted = true;
      // this.$store.dispatch("campaign/submitComment", this.form);
    },
    checkRole(e) {
      if (!e) this.form.role = "INVESTOR";
    }
  }
};
</script>
