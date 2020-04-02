<template lang="pug">
  footer.footer.pt-5.pb-4
    b-container
      b-row
        b-col.py-2(cols="12" lg="3")
          b-row
            b-col
              nuxt-link(to="/")
                b-img.pb-4.d-inline-block.align-middle(
                  :src="require(`@/assets/logo/logo.png`)"
                  width="200"
                )
          b-row
            b-col
              p.text-light Startup investing at its finest.
          b-row
            b-col
              b-link.pr-2.text-light(href="https://www.facebook.com/thewunderfund")
                brand-icon.fa-2x(i="facebook-square")
              b-link.px-2.text-light(href="https://www.linkedin.com/company/wunderfund")
                brand-icon.fa-2x(i="linkedin")
              b-link.px-2.text-light(href="https://twitter.com/thewunderfund")
                brand-icon.fa-2x(i="twitter-square")
              b-link.px-2.text-light(href="https://www.youtube.com/channel/UC6O_9SMFr8BHa5XwfV3xykQ")
                brand-icon.fa-2x(i="youtube-square")
        b-col.py-2(cols="12" lg="2")
          address
            h4.d-none.d-sm-block.text-light About Us
            //- nuxt-link.text-light(to="/about") Our Story
            //- br
            //- b-link.text-light(href="https://blog.wunderfund.co" _target="blank") Blog
            //- br
            b-link.text-light(href="mailto:taylor@wunderfund.co") Email Us
            br
            b-link.text-light(href="tel:5135492502") Call Us
            br
        b-col.py-2(cols="12" md="7")
          p.text-light.text-justify #[nuxt-link(to="/") Wunderfund.co] is run by Wunderfund, Inc. By using this #[nuxt-link(to="/") Wunderfund.co], you accept our #[nuxt-link(to="/") Terms of Use] and #[nuxt-link(to="/") Privacy Policy]. By choosing to invest using Wunderfund.co, you accept our #[nuxt-link(to="/") Investor Agreement]. By choosing to campaign using #[nuxt-link(to="/") Wunderfund.co's] technologies, you accept our #[nuxt-link(to="/") Startup Agreement]. #[nuxt-link(to="/") Wunderfund.co], along with #[b-link(href="https://www.northcapital.com/" target="_blank") North Capital Private Securities] and #[b-link(href="https://www.transferonline.com" target="_blank") Transfer Online] as partners, are all registered with the SEC and are members of FINRA.
</template>

<script>
import BrandIcon from "@/components/Common/BrandIcon";

export default {
  components: {
    BrandIcon
  }
};
</script>

<style lang="scss" scoped>
$background: #003b5a;

.footer {
  background-color: $background;
}
</style>
