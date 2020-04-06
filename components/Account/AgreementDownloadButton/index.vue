<template>
  <b-button :href="url" target="_blank" variant="success" size="sm">
    Download
  </b-button>
</template>

<script>
import { downloadURL } from "@/plugins/firebase";

export default {
  props: {
    documentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url: null
    };
  },
  async mounted() {
    try {
      this.url = await downloadURL("agreements", `${this.documentId}.pdf`);
    } catch (error) {
      throw Error(error.message);
    }
  }
};
</script>
