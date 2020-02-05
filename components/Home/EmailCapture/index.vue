<template lang="pug">
section.py-5.cta__section
  .container
    .row.pb-3
      .col
        h6.text-center Be the first to hear about investment opportunities!
    .row
      .col.d-none.d-md-block
      .col-12.col-md-5
        transition(name="fade" mode="out-in")
          form(v-if="show" @submit.prevent="subscribeUser")
            .input-group
              input.form-control(
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                placeholder="Your email address"
                type="text"
                required
              )
              .input-group-append
                button.btn.btn-secondary.btn-sm.color__gold(
                  @click="subscribeUser"
                  :disabled="!$v.form.email.email"
                ) Sign Up
          p.text-center(v-else) You have subscribed to our newsletter. Thanks!
        .text-center(v-if="$v.form.email.$error")
          small.text-danger Invalid email address.
      .col.d-none.d-md-block
</template>

<script>
import { validationMixin } from "vuelidate";
import { email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null
      },
      show: true
    };
  },
  validations: {
    form: {
      email: {
        email
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async subscribeUser() {
      try {
        const url =
          "https://us-central1-wunderfund-server.cloudfunctions.net/newsletterOnSubscribe";
        await this.$axios.$post(url, { email: this.$v.email.$model });
        this.show = !this.show;
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        this.error = error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$font: "Montserrat", sans-serif;
$color: #c89f5c;

@mixin button__interaction {
  background-color: transparent;
  border: 1px solid #ced4da;
  color: $color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.color {
  &__gold {
    background-color: $color;
    border: 1px solid transparent;

    &:hover,
    &:focus {
      @include button__interaction();
    }
  }
}

.cta {
  &__section {
    background-color: #fafbfc;
  }
}
</style>
