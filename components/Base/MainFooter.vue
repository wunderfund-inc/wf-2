<template lang="pug">
  footer.footer.py-5
    b-container
      b-row
        b-col(sm="6")
          b-row
            b-col
              b-img.pb-4.d-inline-block.align-middle(
                src="../../assets/logo/logo.png"
                width="200"
              )
          b-row.pb-4
            b-col
              b-link.px-2.text-light(href="https://www.facebook.com/thewunderfund")
                facebook-icon(size="2x")
              b-link.px-2.text-light(href="https://www.linkedin.com/company/wunderfund")
                linkedin-icon(size="2x")
          b-row
            b-col
              p.text-light Giving everyone access to early-stage startup investing.
        b-col(sm="6")
          address
            h4.d-none.d-sm-block.text-light About Us
            br
            nuxt-link.text-light(to="/") Our Story
            br
            b-link.text-light(href="https://blog.wunderfund.co" _target="blank") Blog
            br
            b-link.text-light(href="mailto:taylor@wunderfund.co") Email Us
            br
            b-link.text-light(href="tel:5135492502") Call Us
            br
        b-col
          b-row.pt-4
            b-col
              p.text-light Thrivera Venture Fund I LLC runs Wunderfund.co. By using Wunderfund.co, you accept our Terms of Use and Privacy Policy. By choosing to invest using Wunderfund.co, you accept our Investor Agreement. By choosing to campaign using Wunderfund.co, you accept our Startup Agreement. Wunderfund.co is registered with the SEC and is a member of FINRA. We partner with North Capital Private Securities and Transfer Online, who are also registered with the SEC and members of FINRA.
</template>

<script>
import { LinkedinIcon, FacebookIcon } from "vue-feather-icons";

export default {
  components: { LinkedinIcon, FacebookIcon }
};
</script>

<style lang="scss">
.footer {
  background-color: #003b5a;
}
</style>
