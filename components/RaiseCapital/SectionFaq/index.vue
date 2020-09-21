<template>
  <section class="container py-5">
    <h2 class="pb-5 text-center">Frequently Asked Questions</h2>
    <details open>
      <summary class="pb-3">
        <strong>
          How do I get started?
        </strong>
      </summary>
      <p>
        <nuxt-link to="/auth/register">Sign Up</nuxt-link> to become involved in
        the community. Once you start to build out your profile, we make it easy
        for you to fill out the campaign application form allowing you to get
        your campaign off the ground.
      </p>
    </details>
    <details open>
      <summary class="pb-3">
        <strong>
          Are there legal issues I need to be aware of when making a profile?
        </strong>
      </summary>
      <p>
        When you build a crowdfunding campaign, the biggest thing to watch out
        for is making any false promises. As a new company, you can't predict
        the future, so promising explicit revenue targets and specific growth
        numbers can be misleading. You are liable for every statement that is
        not true. Since you're dealing with investors now, you also cannot
        withhold relevant information that could affect their decision to invest
        (e.g. a pending lawsuit). For more information on the Crowdfunding Rules
        for Issuers,
        <b-link
          href="https://www.sec.gov/info/smallbus/secg/rccomplianceguide-051316.htm"
        >
          please visit the SEC site.
        </b-link>
      </p>
    </details>
    <details open>
      <summary class="pb-3">
        <strong>
          Are there eligibility requirements to create a campaign?
        </strong>
      </summary>
      <p>
        Before you can issue an offering on <PlatformTitle />, you have to apply
        and tell us about your team and your company. All Issuers must also meet
        the minimum requirements set forth by the rules of Regulation
        Crowdfunding. If you have questions about your eligibility based on
        these rules, then please contact <PlatformTitle /> and we will let you
        know. Passing this process is not meant to be construed as investment
        advice or endorsement by <PlatformTitle />.
      </p>
    </details>
    <details open>
      <summary class="pb-3">
        <strong>
          How much fundraising can be raised for each campaign?
        </strong>
      </summary>
      <p>
        The range at which any company can raise on our website is anywhere from
        $10k to $1.07M.
      </p>
    </details>
    <h5 class="pt-5">
      Still have questions?
      <nuxt-link to="/faq">
        <strong>Check out the rest of our FAQs.</strong>
      </nuxt-link>
    </h5>
  </section>
</template>

<script>
import PlatformTitle from "@/components/Platform/Title";

export default {
  components: {
    PlatformTitle
  }
};
</script>
