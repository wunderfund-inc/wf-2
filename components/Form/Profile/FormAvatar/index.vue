<template>
  <form class="row justify-content-center" @submit.prevent="submitPhoto">
    <b-avatar :src="blob ? blob : avatar" class="mb-3" size="10rem" />
    <b-form-file
      id="avatar"
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file"
      drop-placeholder="Drop file here"
      accept="image/jpg, image/jpeg, image/png"
      class="mb-3"
      @change="previewAvatar"
    />
    <b-button :variant="color" type="submit" block>Upload Photo</b-button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      file: null,
      blob: null,
    };
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
    avatar() {
      return this.$store.state.profile.avatar;
    },
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
  methods: {
    previewAvatar() {
      const file = document.getElementById("avatar").files[0];
      this.blob = URL.createObjectURL(file);
    },
    async submitPhoto(e) {
      e.preventDefault();
      await this.$store.dispatch("avatar/upload", {
        userId: this.userId,
        file: this.file,
      });
      await window.location.reload();
    },
  },
};
</script>
