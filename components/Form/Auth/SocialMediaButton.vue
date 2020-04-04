<template lang="pug">
  b-button(
    block
    size="lg"
    :style="`background-color: ${color}; border: 1px solid ${color}`"
    @click="signIn"
  )
    brand-icon.d-none.d-md-inline(:i="name === 'facebook' ? 'facebook-f' : name")
    span.d-inline.d-md-none {{ name | properCase }}
</template>

<script>
import BrandIcon from "@/components/Common/BrandIcon";

export default {
  components: {
    BrandIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch("auth/signInWithSocialMedia", this.name);
        // await window.location.replace("/u");
      } catch (error) {
        await this.$store.dispatch("displayError", error.message);
      }
    }
  }
};
</script>
