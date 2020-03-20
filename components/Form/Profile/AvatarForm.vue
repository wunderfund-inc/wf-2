<template lang="pug">
b-form(@submit.prevent="submitPhoto")
  b-img.mb-3(
    :src="blob ? blob : url"
    thumbnail
    alt="Avatar"
    style="max-height: 187px"
  )
  b-form-file#avatar.mb-3(
    v-model="file"
    :state="Boolean(file)"
    placeholder="Choose a file"
    drop-placeholder="Drop file here"
    accept="image/jpg, image/jpeg, image/png"
    @change="previewAvatar"
  )
  b-button(
    variant="success"
    type="submit"
  ) Save Photo
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
      url: "user/avatar",
      userId: "auth/userId"
    })
  },
  methods: {
    previewAvatar() {
      const file = document.getElementById("avatar").files[0];
      this.blob = URL.createObjectURL(file);
    },
    async submitPhoto(e) {
      e.preventDefault();
      await this.$store.dispatch("user/uploadAvatar", {
        userId: this.userId,
        file: this.file
      });
      await window.location.reload();
    }
  }
};
</script>
