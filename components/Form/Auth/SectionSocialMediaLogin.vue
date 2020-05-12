<template>
  <section>
    <div class="row">
      <div v-for="(link, index) in links" :key="index" class="col py-2">
        <social-media-button :name="link.name" :color="link.color" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p v-if="error" class="text-danger">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import SocialMediaButton from "./SocialMediaButton";

export default {
  components: {
    SocialMediaButton
  },
  data() {
    return {
      links: [
        {
          name: "facebook",
          color: "#4267b2"
        },
        {
          name: "google",
          color: "#dd4b39"
        }
        // {
        //   name: "twitter",
        //   color: "#38A1F3"
        // }
      ]
    };
  },
  computed: {
    ...mapGetters({
      error: "socialMediaError"
    })
  }
};
</script>
