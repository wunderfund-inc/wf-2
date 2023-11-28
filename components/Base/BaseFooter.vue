<template>
  <footer
    :style="`background-color: ${bgColor}`"
    class="footer pt-5 d-print-none"
  >
    <div class="container text-light">
      <div class="row">
        <div class="col-12 col-md-3 text-center text-md-left pb-5">
          <div class="row d-flex justify-content-center mb-3">
            <PlatformLogo />
          </div>
          <div
            v-if="platform === 'WFP'"
            class="row d-flex justify-content-around"
          >
            <a href="mailto:taylor@wunderfund.co" class="pr-2 text-light">
              <SolidIcon class="fa-2x" i="envelope-square" />
            </a>
            <a
              href="https://www.facebook.com/thewunderfund"
              class="px-2 text-light"
            >
              <BrandIcon class="fa-2x" i="facebook-square" />
            </a>
            <a
              href="https://www.linkedin.com/company/wunderfund"
              class="px-2 text-light"
            >
              <BrandIcon class="fa-2x" i="linkedin" />
            </a>
            <a href="https://twitter.com/thewunderfund" class="px-2 text-light">
              <BrandIcon class="fa-2x" i="twitter-square" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC6O_9SMFr8BHa5XwfV3xykQ"
              class="px-2 text-light"
            >
              <BrandIcon class="fa-2x" i="youtube-square" />
            </a>
          </div>
          <div v-else class="row d-flex justify-content-around">
            <p>Insert Social Media</p>
          </div>
        </div>
        <div class="col-12 col-md-9 pb-5">
          <p>
            This site (the "Site") is owned and maintained by Wunderfund, Inc.,
            which is not a registered broker-dealer. Wunderfund, Inc. does not
            give investment advice, endorsement, analysis or recommendations
            with respect to any securities. All securities listed here are being
            offered by, and all information included on this Site is the
            responsibility of, the applicable issuer of such securities. The
            intermediary facilitating the offering will be identified in such
            offering's documentation.
          </p>
          <p>
            All funding-portal activities are conducted by Wunderfund, Inc., a
            funding portal which is registered with the US Securities and
            Exchange Commission (SEC) as a funding portal (Portal) and is a
            member of the Financial Industry Regulatory Authority (FINRA).
            Please check our background on
            <FooterLink
              :on-platform="false"
              link="https://www.finra.org/about/firms-we-regulate/funding-portals-we-regulate"
              title="FINRA's Funding Portal Page."
            />
          </p>
          <p>
            Wunderfund, Inc., does not make investment recommendations and no
            communication, through this Site or in any other medium should be
            construed as a recommendation for any security offered on or off
            this investment platform. Investment opportunities posted on this
            Site are private placements of securities that are not publicly
            traded, involve a high degree of risk, may lose value, are subject
            to holding period requirements and are intended for investors who do
            not need a liquid investment. Past performance is not indicative of
            future results. Investors must be able to afford the loss of their
            entire investment.
          </p>
          <p>
            Wunderfund, Inc., and any of its officers, directors, agents and
            employees makes any warranty, express or implied, of any kind
            whatsoever related to the adequacy, accuracy or completeness of any
            information on this Site or the use of information on this site.
            Offers to sell securities can only be made through official offering
            documents that contain important information about the investment
            and the issuers, including risks. Investors should carefully read
            the offering documents. Investors should conduct their own due
            diligence and are encouraged to consult with their tax, legal and
            financial advisors.
          </p>
          <p>
            By accessing the Site and any pages thereof, you agree to be bound
            by the Wunderfund Portal's
            <FooterLink link="/legal/terms-of-use" title="Terms of Use" /> and
            <FooterLink link="/legal/privacy-policy" title="Privacy Policy" />.
          </p>
          <p>
            The inclusion or exclusion of an issuer on the Platform Page and/or
            Wunderfund's Homepage, which includes offerings conducted under
            regulation crowdfunding as well as other exemptions from
            registration, is not based upon any endorsement or recommendation by
            Wunderfund, Inc., nor any of its affiliates, officers, directors,
            agents, and employees. Rather, issuers of securities may, in their
            sole discretion, opt-out of being listed on the Platform Page and
            Homepage.
          </p>
          <p>
            Investors should verify any issuer information they consider
            important before making an investment.
          </p>
          <p>
            Investments in private companies are particularly risky and may
            result in a total loss of invested capital. Past performance of a
            security or a company does not guarantee future results or returns.
            Only investors who understand the risks of early-stage investment
            and who meet the Wunderfund&#39;s investment criteria may invest.
          </p>
          <p>
            Wunderfund Inc., cannot verify information provided by companies on
            this Site and makes no assurance as to the completeness or accuracy
            of any such information. Additional information about companies
            fundraising on the Site can be found by searching the EDGAR
            database, or the offering documentation located on the Site when the
            offering does not require an EDGAR filing.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    platform() {
      return this.$config.PLATFORM;
    },
    bgColor() {
      switch (this.platform) {
        case "WFP":
          return "#003b5a";
        case "WFH":
          return "#007bff";
        default:
          return "#6c757d";
      }
    },
  },
};
</script>

<style scoped>
.footer {
  filter: brightness(1.1);
}
</style>
