<template functional>
  <section class="img__bg py-5">
    <div class="container text-center text-light">
      <h3 class="pb-4">Not sure if crowdfunding is for you?</h3>
      <nuxt-link to="/faq/company">
        <b-button variant="success">See if you qualify!</b-button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  functional: true
};
</script>

<style scoped>
.img__bg {
  background-image: url("https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
