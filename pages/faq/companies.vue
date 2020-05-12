<template>
  <main>
    <div class="container py-5 text-justify">
      <h1 class="text-center mb-5">Company FAQs</h1>
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 mb-3">
          <aside>
            <faq-nav />
          </aside>
        </div>
        <div class="col-12 col-md-9 mb-3">
          <article>
            <faq-item
              v-for="(item, index) in faqData"
              :key="index"
              :question="item.question"
              :answer="item.answer"
            />
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import FaqNav from "@/components/Faq/FaqNav";
import FaqItem from "@/components/Faq/FaqItem";
import faqData from "@/components/Faq/FaqData/companies";

export default {
  components: {
    FaqNav,
    FaqItem
  },
  data() {
    return {
      faqData
    };
  }
};
</script>
