<template>
  <section>
    <div class="container">
      <div class="row py-5">
        <div class="col-md-6 col-sm-12 py-5">
          <h2>Startups need capital.</h2>
          <h2>We've made it easy.</h2>
          <p>
            Fact: Women & Minorities make up less thatn 2% of venture backed
            capital. Crowdfunding is here to change that.
          </p>
          <nuxt-link to="/auth">
            <main-button>Start your raise</main-button>
          </nuxt-link>
        </div>
        <div class="col-md-6 col-sm-8">
          <img
            :src="require(`@/assets/bg/rc.png`)"
            alt="RC Hero"
            class="img__bg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MainButton from "../../Common/MainButton";

export default {
  components: {
    MainButton
  }
};
</script>

<style>
.img__bg {
  width: 100%;
}
</style>
