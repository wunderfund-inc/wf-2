<template>
  <section class="container py-5">
    <slot name="header"></slot>
    <div class="row">
      <div
        v-for="(company, index) in companies"
        :key="index"
        class="col-12 col-md-4"
      >
        <browse-card :company="company" />
      </div>
    </div>
  </section>
</template>

<script>
import BrowseCard from "@/components/BrowseCard";

export default {
  components: { BrowseCard },
  props: {
    companies: {
      type: Array,
      default() {},
      required: true,
    },
  },
};
</script>
