<template>
  <form @submit.prevent="submitPhoto" class="row justify-content-center">
    <b-avatar :src="blob ? blob : avatar" class="mb-3" size="10rem" />
    <b-form-file
      id="avatar"
      v-model="file"
      @change="previewAvatar"
      :state="Boolean(file)"
      placeholder="Choose a file"
      drop-placeholder="Drop file here"
      accept="image/jpg, image/jpeg, image/png"
      class="mb-3"
    />
    <b-button variant="success" type="submit" block>Upload Photo</b-button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      file: null,
      blob: null
    };
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId"
    }),
    avatar() {
      return this.$store.state.profile.avatar;
    }
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
        file: this.file
      });
      await window.location.reload();
    }
  }
};
</script>
