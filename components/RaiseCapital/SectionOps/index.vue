<template>
  <section class="pb-5">
    <div class="container text-center">
      <h2 class="pb-5">How Does It Work?</h2>
      <div class="px-5 pb-5 d-none d-md-block">
        <div class="px-5">
          <div class="px-5">
            <img
              :src="require(`@/assets/raise-capital/line.png`)"
              alt="line"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(item, index) in $options.items"
          :key="index"
          class="col-12 col-sm-4 pb-3"
        >
          <h4>{{ item.title }}</h4>
          <p class="text-justify">{{ item.details }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const items = [
  {
    title: "1. Apply",
    details:
      "Provide us information about your company along with any documents to convince investors",
  },
  {
    title: "2. Due Diligence",
    details:
      "Customize your company profile and complete any other due diligence needed.",
  },
  {
    title: "3. Launch",
    details:
      "Get your company launched. Let us streamline the investment and closing process.",
  },
];

export default {
  created() {
    this.$options.items = items;
  },
};
</script>
