<template lang="pug">
  b-row.pb-4
    b-col.py-2(lg="4")
      social-media-button(name="facebook" color="#4267b2")
    b-col.py-2(lg="4")
      social-media-button(name="google" color="#dd4b39")
    b-col.py-2(lg="4")
      social-media-button(name="twitter" color="#38A1F3")
</template>

<script>
import SocialMediaButton from "./SocialMediaButton";

export default {
  components: {
    SocialMediaButton
  }
};
</script>
