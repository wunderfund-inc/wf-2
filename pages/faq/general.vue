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
            <details
              v-for="(faq, index) in faqs"
              :key="index"
              class="mb-3"
              open
            >
              <summary class="mb-3">
                <strong>{{ faq.question }}</strong>
              </summary>
              <p>{{ faq.answer }}</p>
            </details>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { faqLinks, generalFaqs } from "@/content/faqs";

export default {
  computed: {
    links: () => faqLinks,
    faqs: () => generalFaqs,
  },
};
</script>
