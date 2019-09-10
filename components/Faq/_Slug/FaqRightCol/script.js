import FaqItem from "@/components/Faq/_Slug/FaqItem";

export default {
  components: {
    FaqItem
  },
  props: {
    faqIntro: {
      type: String,
      required: true
    }
  }
};
