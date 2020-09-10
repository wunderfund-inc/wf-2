<template>
  <main>
    <div class="container py-5 text-justify">
      <h1 class="text-center mb-5">General FAQs</h1>
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 mb-3 d-print-none">
          <aside>
            <BaseSubNav :links="links" />
          </aside>
        </div>
        <div class="col-12 col-md-9 mb-3 d-print-block">
          <article>
            <FaqItem
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
import BaseSubNav from "@/components/Base/BaseSubNav";
import FaqItem from "@/components/Faq/FaqItem";
import faqData from "@/components/Faq/FaqData/general";

const faqLinks = [
  {
    name: "General FAQs",
    url: "/faq/general"
  },
  {
    name: "FAQs for Investors",
    url: "/faq/investors"
  },
  {
    name: "FAQs for Companies",
    url: "/faq/companies"
  }
];

export default {
  components: {
    BaseSubNav,
    FaqItem
  },
  data() {
    return {
      links: faqLinks,
      faqData
    };
  }
};
</script>
