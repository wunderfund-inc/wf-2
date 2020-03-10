<template lang="pug">
b-form(@submit.prevent="submitPhoto")
  b-img.mb-3(
    :src="this.blob || this.url"
    thumbnail
    alt="Avatar"
    style="max-height: 200px"
  )
  b-form-file#avatar.mb-1(
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
export default {
  props: {
    url: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      file: null,
      blob: null
    };
  },
  methods: {
    previewAvatar() {
      const file = document.getElementById("avatar").files[0];
      this.blob = URL.createObjectURL(file);
    },
    submitPhoto(e) {
      e.preventDefault();
      // eslint-disable-next-line
      console.log("Save Photo to Firebase Storage")
    }
  }
};
</script>
