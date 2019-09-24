<template lang="pug">
  main
    b-container
      section
        b-row.py-5
          b-col(md="6" sm="12")
            h2 Startups need capital.
            h2 We've made it easy.
            p
              b Fact:
              |
              |
              | Women &amp; Minorities make up less than 2% of venture-backed capital. Crowdfunding is here to change that.
            nuxt-link(to="/auth")
              main-button(txt="Start Your Raise")
          b-col(md="6" sm="8")
            b-img.img--bg(src="../assets/bg/rc.png")
      section
        h2.text-center.pb-5 What Makes Wunderfund Different?
        b-row.pb-5(v-for="(item, index) in items" :key="index")
          b-col(sm="3" lg="6")
            b-img(:src="`/${item.icon}.png`")
          b-col(sm="9" lg="6")
            h5
              strong {{ item.title }}
            p {{ item.description }}
      section
        h2 How does it work?
        b-img(src="/icons/line.png")
</template>

<script>
import MainButton from "@/components/Common/MainButton";

export default {
  components: {
    MainButton
  },
  data() {
    return {
      items: [
        {
          icon: "branding",
          title: "We Are Branders",
          description:
            "We are expert branders who can help you tell an amazing story."
        },
        {
          icon: "lawyer",
          title: "No Lawyers Required",
          description:
            "You read that right. We take care of Form C and any due dilligence."
        },
        {
          icon: "accountant",
          title: "No Accountants Required",
          description:
            "You read that right. We take care of Form C and any due dilligence."
        },
        {
          icon: "diligence",
          title: "We Cover Due Diligence",
          description:
            "It’s all automated but if you need business help, we have the experience."
        },
        {
          icon: "vet",
          title: "We Vet the Deals",
          description:
            "We walk through your financials and pitch deck to match what we know investors will back."
        },
        {
          icon: "help",
          title: "We're Here to Help!",
          description:
            "We’re available 24/7 to answer questions. Just hit that chat box in the right corner"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.img--bg {
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
  width: inherit;
}
</style>
