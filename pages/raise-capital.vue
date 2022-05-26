<template>
  <main>
    <section>
      <div class="container">
        <div class="row py-5">
          <div class="col-md-6 col-sm-12 py-5">
            <h2>Startups need capital.</h2>
            <h2>We've made it easy.</h2>
            <p>
              Fact: Women & Minorities make up less than 2% of venture backed
              capital. Crowdfunding is here to change that.
            </p>
            <a
              href="https://airtable.com/shrNZSPsjsBCtk1yv"
              target="_blank"
              rel="noreferrer"
            >
              <button :class="`btn btn-lg btn-${color} p-3`">
                Apply to Campaign
              </button>
            </a>
          </div>
          <div class="col-md-6 col-sm-8">
            <img
              :src="require(`@/assets/bg/rc.png`).default"
              alt="Raise Capital Hero Image"
              class="img__bg-hero"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <h2 class="text-center pb-5">
          What makes <PlatformTitle /> different?
        </h2>
        <div class="row">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="col-12 col-sm-6 pb-5"
          >
            <div class="row">
              <div class="col-lg-2 col-sm-3 d-none d-md-block">
                <img
                  :src="
                    require(`@/assets/raise-capital/${item.icon}.png`).default
                  "
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

    <section class="pb-5">
      <div class="container text-center">
        <h2 class="pb-5">How Does It Work?</h2>
        <div class="px-5 pb-5 d-none d-md-block">
          <div class="px-5">
            <div class="px-5">
              <img
                :src="require(`@/assets/raise-capital/line.png`).default"
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

    <section class="img__bg-eligible py-5">
      <div class="container text-center text-light">
        <h3 class="pb-4">Not sure if crowdfunding is for you?</h3>
        <a
          href="https://airtable.com/shrNZSPsjsBCtk1yv"
          target="_blank"
          rel="noreferrer"
        >
          <button :class="`btn btn-${color} px-4`">See if you qualify!</button>
        </a>
      </div>
    </section>

    <section class="container py-5">
      <h2 class="pb-5 text-center">Frequently Asked Questions</h2>
      <details open>
        <summary class="pb-3">
          <strong> How do I get started? </strong>
        </summary>
        <p>
          <nuxt-link to="/auth/register">Sign Up</nuxt-link> to become involved
          in the community. Once you start to build out your profile, we make it
          easy for you to fill out the campaign application form allowing you to
          get your campaign off the ground.
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
          withhold relevant information that could affect their decision to
          invest (e.g. a pending lawsuit). For more information on the
          Crowdfunding Rules for Issuers,
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
          Before you can issue an offering on <PlatformTitle />, you have to
          apply and tell us about your team and your company. All Issuers must
          also meet the minimum requirements set forth by the rules of
          Regulation Crowdfunding. If you have questions about your eligibility
          based on these rules, then please contact <PlatformTitle /> and we
          will let you know. Passing this process is not meant to be construed
          as investment advice or endorsement by <PlatformTitle />.
        </p>
      </details>
      <details open>
        <summary class="pb-3">
          <strong>
            How much fundraising can be raised for each campaign?
          </strong>
        </summary>
        <p>
          The range at which any company can raise on our website is anywhere
          from $10k to $1.07M.
        </p>
      </details>
      <h5 class="pt-5">
        Still have questions?
        <nuxt-link to="/faq/general">
          <strong>Check out the rest of our FAQs.</strong>
        </nuxt-link>
      </h5>
    </section>
  </main>
</template>

<script>
import { raiseCapitalFaqs } from "@/content/faqs";

export default {
  computed: {
    items: () => raiseCapitalFaqs,
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
};
</script>

<style scoped>
.img__bg-hero {
  width: 100%;
}

.img__bg-eligible {
  background-image: url("https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-size: cover;
}

.aside {
  width: 100%;
  display: inline-block;
}
</style>
