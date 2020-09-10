<template>
  <article>
    <FaqItem
      v-for="(item, index) in faqData"
      :key="index"
      :question="item.question"
      :answer="item.answer"
    />
  </article>
</template>

<script>
import FaqItem from "@/components/Faq/FaqItem";
import faqData from "@/components/Faq/FaqData/investors";

export default {
  layout: "documentation",
  components: {
    FaqItem
  },
  data() {
    return {
      faqData
    };
  }
};
</script>
