<template>
  <section class="py-5">
    <div class="container">
      <h2 class="text-center pb-5">What makes Wunderfund different?</h2>
      <div class="row">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-12 col-sm-6 pb-5"
        >
          <div class="row">
            <div class="col-lg-2 col-sm-3 d-none d-md-block">
              <img
                :src="require(`@/assets/raise-capital/${item.icon}.png`)"
                alt="icon"
                class="aside"
              />
            </div>
            <div class="col-lg-10 col-sm-9">
              <h5 class="d-none d-md-block">
                <strong>{{ item.title }}</strong>
              </h5>
              <h5 class="d-block d-md-none text-center">
                <strong>{{ item.title }}</strong>
              </h5>
              <p class="text-justify">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const items = [
  {
    icon: "branding",
    title: "We are Branders",
    description:
      "We are expert branders who can help you tell an amazing story."
  },
  {
    icon: "lawyer",
    title: "No Lawyers Required",
    description:
      "You read that right! We take care of your submission forms to the SEC, along with any due diligence."
  },
  {
    icon: "accountant",
    title: "No Accountants Required",
    description:
      "You read that right! We take care of your submission forms to the SEC, along with any due diligence."
  },
  {
    icon: "diligence",
    title: "We cover Due Diligence",
    description:
      "It’s all automated anyways, but if you need business help, we have the experience to help you!"
  },
  {
    icon: "vet",
    title: "We vet ALL our deals",
    description:
      "We walk through your financials and pitch deck to match what we know investors will back."
  },
  {
    icon: "help",
    title: "We're here to help!",
    description:
      "We’re available 24/7 to answer questions. Just hit that chat box in the lower right corner!"
  }
];
export default {
  computed: {
    items: () => items
  }
};
</script>

<style scoped>
.aside {
  width: 100%;
  display: inline-block;
}
</style>
