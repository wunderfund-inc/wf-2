<template lang="pug">
section.py-5.cta__section
  b-container
    b-row.pb-3
      b-col
        h6.text-center Be the first to hear about investment opportunities!
    b-row
      b-col.d-none.d-md-block
      b-col(cols="12" md="5")
        transition(name="fade" mode="out-in")
          b-form(v-if="show" @submit.stop.prevent="subscribeUser")
            b-input-group
              b-form-input(
                v-model="email"
                type="email"
                required
                placeholder="Your email address"
              )
              b-input-group-append
                b-button.color__gold(size="sm" @click="subscribeUser") Sign Up
          p.text-center(v-else) You have subscribed to our newsletter. Thanks!
        .text-center(v-if="error")
          small.text-danger {{ error }}
      b-col.d-none.d-md-block
</template>

<script>
import { validEmail } from "@/plugins/validators";

export default {
  data() {
    return {
      email: null,
      show: true,
      error: null
    };
  },
  methods: {
    subscribeUser() {
      const valid = validEmail(this.email);

      if (valid) {
        this.error = null;
        this.show = !this.show;
        this.email = null;
      } else {
        this.error = "Error: please input a valid email address.";
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
