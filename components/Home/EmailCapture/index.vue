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
          b-form(v-if="show")
            b-input-group
              b-form-input(
                v-model="email"
                type="email"
                required
                placeholder="Your email address"
              )
              b-input-group-append
                b-button.color__gold(size="sm" @click="subscribeUser") Sign Up
          div(v-else)
            p.text-center You have subscribed to our newsletter. Thanks!
      b-col.d-none.d-md-block
</template>

<script>
export default {
  data() {
    return {
      email: null,
      show: true
    };
  },
  methods: {
    subscribeUser() {
      this.show = !this.show;
      // this.$store.dispatch('subscribeToNewsletter', this.email)
      this.email = null;
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
