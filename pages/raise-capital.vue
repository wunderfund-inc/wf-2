<template>
  <div>
    <section-jumbotron />
    <section-unique />
    <section-ops />
    <section-eligibility />
    <b-container>
      <div class="FAQSection">
        <h2 class="FAQHeader">
          Frequently Asked Questions
        </h2>
        <div class="question">
          <h4>
            How do I get started?
          </h4>
          <p style="margin-top:10px;">
            Hit that button in the upper right corner and Sign Up to become
            involved in the community. Once you start to build out your profile,
            we make it easy for you to fill out the campaign application form
            allowing you to get your campaign off the ground.
          </p>
        </div>
        <div class="question">
          <h4>
            Are there legal issues I need to be aware of when making a profile?
          </h4>
          <p style="margin-top:10px;">
            When you build a crowdfunding campaign, the biggest thing to watch
            out for is making any false promises. As a new company, you can't
            predict the future, so promising explicit revenue targets and
            specific growth numbers can be misleading. You are liable for every
            statement that is not true. Since you're dealing with investors now,
            you also cannot withhold relevant information that could affect
            their decision to invest (e.g. a pending lawsuit). For more
            information on the Crowdfunding Rules for Issuers, please visit THIS
            SITE.
          </p>
        </div>
        <div class="question">
          <h4>
            Are there eligibility requirements for my company to create a
            campaign?
          </h4>
          <p style="margin-top:10px;">
            Before you can issue an offering on Wunderfund.co, you have to apply
            and tell us about your team and your company. All Issuers must also
            meet the minimum requirements set forth by the rules of Regulation
            Crowdfunding. If you have questions about your eligibility based on
            these rules, then please contact Wunderfund and we will let you
            know. Passing this process is not meant to be construed as
            investment advice or endorsement by Wunderfund.co.
          </p>
        </div>
        <div class="question">
          <h4>
            How much fundraising can be raised for each campaign?
          </h4>
          <p style="margin-top:10px;">
            The range at which any company can raise on our website is anywhere
            from $25,000 to $1.07 million.
          </p>
        </div>
        <br />
        <h5 style="margin-top:10px;">
          Still have questions?
          <nuxt-link to="/faq" class="faqLink">
            <strong>
              Go To FAQ
              <!-- <fa :icon="fas.faLongArrowAltRight"/> -->
            </strong>
          </nuxt-link>
        </h5>
      </div>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.FAQSection {
  padding-top: 60px;
  padding-bottom: 60px;
  .FAQHeader {
    text-align: center;
  }
  .question {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  a.faqLink {
    color: #11628c;
  }
  a.faqLink:hover {
    opacity: 0.7;
    text-decoration: none;
  }
}

@media only screen and (max-width: 769px) {
  .headDiv {
    height: 80vh;
  }
}
</style>

<script>
// import { fas } from "@fortawesome/free-solid-svg-icons"
import SectionJumbotron from "@/components/RaiseCapital/SectionJumbotron";
import SectionUnique from "@/components/RaiseCapital/SectionUnique";
import SectionOps from "@/components/RaiseCapital/SectionOps";
import SectionEligibility from "@/components/RaiseCapital/SectionEligibility";

export default {
  auth: false,
  components: {
    SectionJumbotron,
    SectionUnique,
    SectionOps,
    SectionEligibility
  },
  data() {
    return {
      categories: [
        "Alcohol",
        "Transportation",
        "Tech",
        "Retail",
        "Food",
        "Gaming",
        "IoT"
      ]
    };
  },
  computed: {
    // fas() {
    //   return fas
    // },
    loggedIn() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>
