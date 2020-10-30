<template>
  <b-button :href="url" :variant="color" target="_blank" size="sm">
    Download
  </b-button>
</template>

<script>
import { downloadURL } from "@/plugins/firebase";

export default {
  props: {
    documentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      url: null,
    };
  },
  computed: {
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
  async mounted() {
    try {
      this.url = await downloadURL("agreements", `${this.documentId}.pdf`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
</script>
