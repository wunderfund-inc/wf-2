<template>
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
            :src="require(`@/assets/bg/rc.png`)"
            alt="Raise Capital Hero Image"
            class="img__bg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    }
  }
};
</script>

<style>
.img__bg {
  width: 100%;
}
</style>
