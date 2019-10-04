<template lang="pug">
  section
    b-container.py-5
      h2.title.text-center Invest in companies you care about
      b-row.pt-5
        b-card-group(deck)
          b-card.border-0(
            v-for="(category, index) in categories"
            :key="index"
            no-body
            border-variant="transparent"
            :img-src="require(`@/assets/browse/${category}.png`)"
          )
            b-card-footer.border-top-0.text-center(
              footer-bg-variant="transparent"
              footer-border-variant="transparent"
            ) {{ category | properCase }}
</template>

<script>
export default {
  data() {
    return {
      categories: [
        "alcohol",
        "tech",
        "retail",
        "food",
        "gaming",
        "iot",
        "transit"
      ]
    };
  }
};
</script>
